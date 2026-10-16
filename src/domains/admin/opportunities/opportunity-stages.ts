export type OpportunityStage =
  | "viewing_scheduled"
  | "proposal_sent"
  | "date_held"
  | "deposit_received"
  | "contract_signed"
  | "in_planning"
  | "delivered"
  | "reviewed";

export const OPPORTUNITY_STAGES: OpportunityStage[] = [
  "viewing_scheduled",
  "proposal_sent",
  "date_held",
  "deposit_received",
  "contract_signed",
  "in_planning",
  "delivered",
  "reviewed",
];

export function stageLabel(stage: OpportunityStage) {
  return stage
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
