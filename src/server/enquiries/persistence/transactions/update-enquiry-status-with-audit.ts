import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import type { EnquiryStatus } from "../../services/managed/enquiry-status";
import { selectEnquiry } from "../queries/select-enquiry";
import { updateEnquiryStatusRow } from "../queries/update-enquiry-status";

/** Update + audit; the write pair is one transaction. */
export async function updateEnquiryStatusWithAudit(
  id: string,
  status: EnquiryStatus,
  actorId: string,
  notes?: string,
) {
  const current = await selectEnquiry(id);
  if (!current) return null;
  return db.$transaction(async (tx) => {
    const updated = await updateEnquiryStatusRow(tx, id, status.toUpperCase() as "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED", notes);
    await insertAuditEntry(
      {
        actorId,
        action: "enquiry.status-changed",
        entityType: "enquiry",
        entityId: id,
        metadata: { from: current.status, to: status },
      },
      tx,
    );
    return updated;
  }, { timeout: 10_000 });
}
