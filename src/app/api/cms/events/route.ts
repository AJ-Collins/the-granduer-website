import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { createEventTypeController } from "@/server/catalog/controllers/events/create-event-type";
import { listEventTypesController } from "@/server/catalog/controllers/events/list-event-types";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.cmsAccess);
  if (denied) return denied;
  return listEventTypesController(false);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.catalogManage);
  if (denied) return denied;
  return createEventTypeController(req);
}
