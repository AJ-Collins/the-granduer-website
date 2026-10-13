import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { listContentBlocksController } from "@/server/cms/controllers/content-blocks/list-content-blocks";
import { upsertContentBlockController } from "@/server/cms/controllers/content-blocks/upsert-content-block";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.cmsAccess);
  if (denied) return denied;
  return listContentBlocksController(false);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.contentPublish);
  if (denied) return denied;
  return upsertContentBlockController(req);
}
