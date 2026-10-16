import { describe, expect, it } from "vitest";
import {
  OPPORTUNITY_STAGES,
  assertOpportunityStageTransition,
} from "@/server/enquiries/services/opportunities/opportunity-stage";
import { InvalidStageTransitionError } from "@/server/enquiries/services/errors/invalid-stage-transition-error";

describe("opportunity stage transitions", () => {
  it("covers the full ENQUIRE-to-REVIEW pipeline in order", () => {
    expect(OPPORTUNITY_STAGES).toEqual([
      "viewing_scheduled",
      "proposal_sent",
      "date_held",
      "deposit_received",
      "contract_signed",
      "in_planning",
      "delivered",
      "reviewed",
    ]);
  });

  it("advances one stage at a time", () => {
    expect(() => assertOpportunityStageTransition("viewing_scheduled", "proposal_sent")).not.toThrow();
    expect(() => assertOpportunityStageTransition("delivered", "reviewed")).not.toThrow();
  });

  it("rejects skipping stages", () => {
    expect(() => assertOpportunityStageTransition("viewing_scheduled", "date_held")).toThrow(
      InvalidStageTransitionError,
    );
  });

  it("rejects moving backwards", () => {
    expect(() => assertOpportunityStageTransition("deposit_received", "proposal_sent")).toThrow(
      "Cannot move opportunity from deposit_received to proposal_sent",
    );
  });

  it("rejects leaving the terminal stage", () => {
    expect(() => assertOpportunityStageTransition("reviewed", "reviewed")).toThrow(
      InvalidStageTransitionError,
    );
  });
});
