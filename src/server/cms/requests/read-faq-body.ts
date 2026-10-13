import { z } from "zod";

export const faqBodySchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(20000),
  category: z.string().max(120).nullish(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export type FaqBody = z.infer<typeof faqBodySchema>;
