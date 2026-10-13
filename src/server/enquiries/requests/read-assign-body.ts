import { z } from "zod";

export const assignEnquirySchema = z.object({
  assignedToId: z.string().min(1).max(64).nullable(),
});

export type AssignEnquiryBody = z.infer<typeof assignEnquirySchema>;
