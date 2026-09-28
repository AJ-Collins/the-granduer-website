import { z } from "zod";

export const contentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
});

export type ContentInput = z.infer<typeof contentSchema>;
