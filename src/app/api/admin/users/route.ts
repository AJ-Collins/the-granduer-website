import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { listUsersController } from "@/server/admin/controllers/list-users";
import { createUserController } from "@/server/admin/controllers/create-user";
import { requireUser } from "@/server/auth/services/require-user";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  return listUsersController(req);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.usersManage);
  if (denied) return denied;
  return createUserController(req, user);
}
