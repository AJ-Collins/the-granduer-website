import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { fail } from "@/server/http/fail-response";
import { getUserController } from "@/server/admin/controllers/users/get-user";
import { setUserRolesController } from "@/server/admin/controllers/users/set-user-roles";
import { setUserStatusController } from "@/server/admin/controllers/users/set-user-status";
import { requireUser } from "@/server/auth/services/sessions/require-user";

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
  const body = (await req.clone().json().catch(() => ({}))) as { roleKeys?: unknown };
  if (body.roleKeys !== undefined) return setUserRolesController(req, id, user);
  if ((body as { status?: unknown }).status !== undefined) return setUserStatusController(req, id, user);
  return fail("BAD_REQUEST", "Provide status or roleKeys", { status: 400 });
}
