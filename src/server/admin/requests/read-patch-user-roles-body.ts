import { z } from "zod";

export const patchUserRolesSchema = z.object({
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10),
});

export type PatchUserRolesBody = z.infer<typeof patchUserRolesSchema>;
