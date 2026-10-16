import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { getRoleController } from "@/server/admin/controllers/roles/get-role";
import { requireUser } from "@/server/auth/services/sessions/require-user";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  const { id } = await ctx.params;
  return getRoleController(id);
}
