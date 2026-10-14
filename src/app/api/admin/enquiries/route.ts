import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { listEnquiriesController } from "@/server/enquiries/controllers/managed/list-enquiries";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  return listEnquiriesController(req);
}
