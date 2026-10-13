import { z } from "zod";

export const contentBodySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  title: z.string().min(1).max(200),
  body: z.unknown().optional(),
  seoTitle: z.string().max(200).nullish(),
  seoDescription: z.string().max(400).nullish(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export type ContentBody = z.infer<typeof contentBodySchema>;
