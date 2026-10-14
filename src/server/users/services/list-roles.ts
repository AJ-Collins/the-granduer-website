import { selectRoles } from "../persistence/queries/select-roles";

export async function listRoles() {
  return selectRoles();
}
