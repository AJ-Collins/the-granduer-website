import { ok } from "../../../http/ok-response";
import { selectRoles } from "../../../users/persistence/queries/select-roles";

export async function listRolesController(): Promise<Response> {
  return ok(await selectRoles());
}
