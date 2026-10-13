import { z } from "zod";

export const submitEnquirySchema = z.object({
  kind: z.enum(["viewing", "proposal"]),
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20).optional(),
  message: z.string().max(5000).optional(),
  eventDate: z.string().datetime().optional(),
  eventTypeSlug: z.string().max(120).optional(),
  packageSlug: z.string().max(120).optional(),
});

export type SubmitEnquiryBody = z.infer<typeof submitEnquirySchema>;
