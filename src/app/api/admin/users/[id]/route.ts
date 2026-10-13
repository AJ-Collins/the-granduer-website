import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { getUserController } from "@/server/admin/controllers/get-user";
import { patchUserController } from "@/server/admin/controllers/patch-user";
import { requireUser } from "@/server/auth/services/require-user";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  const { id } = await ctx.params;
  return getUserController(id);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.usersManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  return patchUserController(req, id, user);
}
