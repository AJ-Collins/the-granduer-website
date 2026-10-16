import type { OpportunityStage } from "../../services/opportunities/opportunity-stage";
import type { StoredOpportunityRow, StoredStageTransitionRow } from "../rows";

export function toOpportunityStage(stage: StoredOpportunityRow["stage"]): OpportunityStage {
  return stage.toLowerCase() as OpportunityStage;
}

export function toOpportunityRecord(row: StoredOpportunityRow) {
  return { ...row, stage: toOpportunityStage(row.stage) };
}

export function toStageTransitionRecord(row: StoredStageTransitionRow) {
  return {
    ...row,
    from: row.from ? (row.from.toLowerCase() as OpportunityStage) : null,
    to: row.to.toLowerCase() as OpportunityStage,
  };
}
