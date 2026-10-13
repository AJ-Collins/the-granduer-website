import type { EnquiryStatus } from "../enquiry-status";
import { updateEnquiryStatusWithAudit } from "../../persistence/transactions/update-enquiry-status-with-audit";

export async function setManagedEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  actorId: string,
  notes?: string,
) {
  return updateEnquiryStatusWithAudit(id, status, actorId, notes);
}
