import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { getSiteSettingsController } from "@/server/admin/controllers/settings/get-site-settings";
import { updateSiteSettingsController } from "@/server/admin/controllers/settings/update-site-settings";
import { requireUser } from "@/server/auth/services/sessions/require-user";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  return getSiteSettingsController();
}

export async function PATCH(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  return updateSiteSettingsController(req, user);
}
