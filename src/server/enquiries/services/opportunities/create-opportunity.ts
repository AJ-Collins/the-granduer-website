import { createOpportunityWithAudit } from "../../persistence/transactions/create-opportunity-with-audit";

export async function createOpportunity(enquiryId: string, actorId: string, notes?: string) {
  return createOpportunityWithAudit(enquiryId, actorId, notes);
}
