import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import { uploadFile } from "@/server/storage/controllers/upload-file";

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.uploadsCreate);
  if (denied) return denied;
  return uploadFile(req, user);
}
