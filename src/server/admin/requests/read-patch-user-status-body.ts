import { z } from "zod";

export const patchUserStatusSchema = z.object({
  status: z.enum(["active", "suspended", "deactivated"]),
});

export type PatchUserStatusBody = z.infer<typeof patchUserStatusSchema>;
