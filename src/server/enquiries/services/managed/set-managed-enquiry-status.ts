import { assertEnquiryTransition, type EnquiryStatus } from "./enquiry-status";
import { selectEnquiry } from "../../persistence/queries/select-enquiry";
import { updateEnquiryStatusWithAudit } from "../../persistence/transactions/update-enquiry-status-with-audit";

export async function setManagedEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  actorId: string,
  notes?: string,
) {
  const current = await selectEnquiry(id);
  if (!current) return null;
  assertEnquiryTransition(current.status as EnquiryStatus, status);
  return updateEnquiryStatusWithAudit(id, status, actorId, notes);
}
