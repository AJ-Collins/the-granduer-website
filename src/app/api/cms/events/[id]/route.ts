import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import {
  setEventTypeStatusController,
  updateEventTypeController,
} from "@/server/catalog/controllers/event-types";

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
