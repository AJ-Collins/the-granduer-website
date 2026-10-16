import { advanceOpportunityStageWithAudit } from "../../persistence/transactions/advance-opportunity-stage-with-audit";
import { selectOpportunity } from "../../persistence/queries/select-opportunity";
import { assertOpportunityStageTransition, type OpportunityStage } from "./opportunity-stage";

export async function advanceOpportunityStage(
  id: string,
  stage: OpportunityStage,
  actorId: string,
  notes?: string,
) {
  const current = await selectOpportunity(id);
  if (!current) return null;
  assertOpportunityStageTransition(current.stage, stage);
  return advanceOpportunityStageWithAudit(id, stage, actorId, notes);
}
