import { assignEnquiryWithAudit } from "../../persistence/transactions/assign-enquiry-with-audit";

export async function assignManagedEnquiry(
  id: string,
  assignedToId: string | null,
  actorId: string,
) {
  return assignEnquiryWithAudit(id, assignedToId, actorId);
}
