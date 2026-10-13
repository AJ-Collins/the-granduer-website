import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import { upsertFaqController } from "@/server/cms/controllers/faqs";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.contentPublish);
  if (denied) return denied;
  const { id } = await ctx.params;
  return upsertFaqController(req, id);
}
