import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { listUsersController } from "@/server/admin/controllers/users/list-users";
import { createUserController } from "@/server/admin/controllers/users/create-user";
import { requireUser } from "@/server/auth/services/sessions/require-user";

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
