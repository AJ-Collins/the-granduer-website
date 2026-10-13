import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import {
  listContentBlocksController,
  upsertContentBlockController,
} from "@/server/cms/controllers/content-blocks";

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
