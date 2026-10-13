import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { setEventTypeStatusController } from "@/server/catalog/controllers/events/set-event-type-status";
import { updateEventTypeController } from "@/server/catalog/controllers/events/update-event-type";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.catalogManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  const url = new URL(req.url);
  if (url.searchParams.get("action") === "status") return setEventTypeStatusController(req, id);
  return updateEventTypeController(req, id);
}
