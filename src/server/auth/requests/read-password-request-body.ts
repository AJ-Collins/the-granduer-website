import { z } from "zod";

export const passwordRequestBodySchema = z.object({
  email: z.string().email().max(254),
});
