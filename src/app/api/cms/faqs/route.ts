import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import { listFaqsController, upsertFaqController } from "@/server/cms/controllers/faqs";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.cmsAccess);
  if (denied) return denied;
  return listFaqsController(false);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.contentPublish);
  if (denied) return denied;
  return upsertFaqController(req, null);
}
