import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { updatePackageController } from "@/server/catalog/controllers/packages/update-package";
import { setPackageStatusController } from "@/server/catalog/controllers/packages/set-package-status";

async function guard(req: Request, permission: string) {
  const user = await requireUser(req);
  if (user instanceof Response) return { response: user } as const;
  const denied = requirePermission(user, permission);
  if (denied) return { response: denied } as const;
  return { user };
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard(req, PERMISSIONS.catalogManage);
  if ("response" in g) return g.response;
  const { id } = await ctx.params;
  const url = new URL(req.url);
  if (url.searchParams.get("action") === "status") return setPackageStatusController(req, id);
  return updatePackageController(req, id);
}
