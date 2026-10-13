import { z } from "zod";

export const adminUserQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["active", "suspended", "deactivated"]).optional(),
  search: z.string().max(120).optional(),
});

export const createAdminUserSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(12).max(128),
  name: z.string().max(120).optional(),
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10),
});

export const setAdminUserStatusSchema = z.object({
  status: z.enum(["active", "suspended", "deactivated"]),
});

export const setAdminUserRolesSchema = z.object({
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10),
});
