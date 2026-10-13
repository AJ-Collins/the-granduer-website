import { z } from "zod";

export const enquiryBodySchema = z.object({
  kind: z.enum(["viewing", "proposal"]),
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  message: z.string().max(5000).optional(),
  eventDate: z.string().datetime().optional(),
  eventTypeSlug: z.string().max(120).optional(),
  packageSlug: z.string().max(120).optional(),
});

export type EnquiryBody = z.infer<typeof enquiryBodySchema>;
