import { selectOpportunities } from "../../persistence/queries/select-opportunities";
import type { OpportunityStage } from "./opportunity-stage";

export async function listOpportunities(page: number, pageSize: number, stage?: OpportunityStage) {
  return selectOpportunities(page, pageSize, stage);
}
