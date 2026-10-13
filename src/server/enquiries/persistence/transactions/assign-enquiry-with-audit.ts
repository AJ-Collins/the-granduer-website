import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import { selectEnquiry } from "../queries/select-enquiry";
import { updateEnquiryAssignment } from "../queries/update-enquiry-assignment";

/** Assign + audit in one transaction — never a silent assignment. */
export async function assignEnquiryWithAudit(
  id: string,
  assignedToId: string | null,
  actorId: string,
) {
  const current = await selectEnquiry(id);
  if (!current) return null;
  return db.$transaction(async (tx) => {
    const updated = await updateEnquiryAssignment(tx, id, assignedToId);
    await insertAuditEntry(
      {
        actorId,
        action: "enquiry.assigned",
        entityType: "enquiry",
        entityId: id,
        metadata: { from: current.assignedToId, to: assignedToId },
      },
      tx,
    );
    return updated;
  }, { timeout: 10_000 });
}
