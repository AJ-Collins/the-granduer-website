import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import { insertOpportunity } from "../queries/insert-opportunity";
import { selectEnquiry } from "../queries/select-enquiry";
import { updateOpportunityStageRow } from "../queries/update-opportunity-stage";
import type { StoredOpportunityRow } from "../rows";

/** Create + initial transition + audit — one transaction, never silent. */
export async function createOpportunityWithAudit(enquiryId: string, actorId: string, notes?: string) {
  const enquiry = await selectEnquiry(enquiryId);
  if (!enquiry) return null;
  return db.$transaction(async (tx) => {
    const created = await insertOpportunity(tx, enquiryId);
    await tx.opportunityStageTransition.create({
      data: {
        opportunityId: created.id,
        from: null,
        to: "VIEWING_SCHEDULED",
        ...(notes !== undefined && { notes }),
        actorId,
      },
    });
    await insertAuditEntry(
      {
        actorId,
        action: "opportunity.created",
        entityType: "opportunity",
        entityId: created.id,
        metadata: { enquiryId },
      },
      tx,
    );
    return created;
  }, { timeout: 10_000 });
}
