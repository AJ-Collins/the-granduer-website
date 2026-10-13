import { ok } from "../../http/api-response";
import { requireUser } from "../services/require-user";

export async function me(req: Request): Promise<Response> {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  return ok({
    id: user.id,
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
  });
}
