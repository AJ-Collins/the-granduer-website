import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { getDashboardStatsController } from "@/server/admin/controllers/get-dashboard-stats";
import { requireUser } from "@/server/auth/services/require-user";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  return getDashboardStatsController();
}
