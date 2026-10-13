import { z } from "zod";

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "assigned", "contacted", "closed"]),
  notes: z.string().max(5000).optional(),
});

export type EnquiryStatusBody = z.infer<typeof enquiryStatusSchema>;
