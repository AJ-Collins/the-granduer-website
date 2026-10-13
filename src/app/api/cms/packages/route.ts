import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import { listPackagesController } from "@/server/catalog/controllers/list-packages";
import { createPackageController } from "@/server/catalog/controllers/create-package";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.cmsAccess);
  if (denied) return denied;
  return listPackagesController(false);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.catalogManage);
  if (denied) return denied;
  return createPackageController(req);
}
