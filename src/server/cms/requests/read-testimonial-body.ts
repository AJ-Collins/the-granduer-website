import { z } from "zod";

export const testimonialBodySchema = z.object({
  name: z.string().min(1).max(160),
  quote: z.string().min(1).max(5000),
  eventType: z.string().max(160).nullish(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export type TestimonialBody = z.infer<typeof testimonialBodySchema>;
