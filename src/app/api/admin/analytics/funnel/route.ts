import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { getFunnelSummaryController } from "@/server/analytics/controllers/get-funnel-summary";
import { requireUser } from "@/server/auth/services/sessions/require-user";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  return getFunnelSummaryController();
}
