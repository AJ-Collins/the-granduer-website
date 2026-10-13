import { z } from "zod";

export const passwordResetBodySchema = z.object({
  token: z.string().min(16).max(128),
  newPassword: z.string().min(12).max(128),
});
