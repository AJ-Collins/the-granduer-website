import { ok } from "../../../http/ok-response";
import { listRoles } from "../../../users/services/list-roles";

export async function listRolesController(): Promise<Response> {
  return ok(await listRoles());
}
