import { InvalidStageTransitionError } from "../errors/invalid-stage-transition-error";

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

const TRANSITIONS: Record<OpportunityStage, OpportunityStage[]> = {
  viewing_scheduled: ["proposal_sent"],
  proposal_sent: ["date_held"],
  date_held: ["deposit_received"],
  deposit_received: ["contract_signed"],
  contract_signed: ["in_planning"],
  in_planning: ["delivered"],
  delivered: ["reviewed"],
  reviewed: [],
};

export function assertOpportunityStageTransition(from: OpportunityStage, to: OpportunityStage): void {
  if (!TRANSITIONS[from].includes(to)) throw new InvalidStageTransitionError(from, to);
}
