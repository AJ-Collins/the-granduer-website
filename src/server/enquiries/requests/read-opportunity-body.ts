import { z } from "zod";

export const createOpportunitySchema = z.object({
  enquiryId: z.string().min(1).max(64),
  notes: z.string().max(2000).optional(),
});

export type CreateOpportunityBody = z.infer<typeof createOpportunitySchema>;
