import { z } from "zod";

export const opportunityStageSchema = z.object({
  stage: z.enum([
    "viewing_scheduled",
    "proposal_sent",
    "date_held",
    "deposit_received",
    "contract_signed",
    "in_planning",
    "delivered",
    "reviewed",
  ]),
  notes: z.string().max(2000).optional(),
});

export type OpportunityStageBody = z.infer<typeof opportunityStageSchema>;
