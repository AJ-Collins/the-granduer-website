import { z } from "zod";

export const eventBodySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  name: z.string().min(1).max(160),
  description: z.string().max(20000).nullish(),
  sortOrder: z.number().int().min(0).optional(),
});

export type EventInput = z.infer<typeof eventBodySchema>;
