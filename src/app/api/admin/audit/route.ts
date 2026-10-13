import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { listAuditLogsController } from "@/server/admin/controllers/audit/list-audit-logs";
import { requireUser } from "@/server/auth/services/sessions/require-user";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.auditRead);
  if (denied) return denied;
  return listAuditLogsController(req);
}
