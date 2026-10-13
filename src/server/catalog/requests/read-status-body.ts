import { z } from "zod";

export const publishStatusSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
});

export type PublishStatusBody = z.infer<typeof publishStatusSchema>;
