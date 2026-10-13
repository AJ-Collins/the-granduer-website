import { z } from "zod";

export const createUserBodySchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(12).max(128),
  name: z.string().max(120).optional(),
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
