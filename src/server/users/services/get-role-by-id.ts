import { selectRoleById } from "../persistence/queries/select-role-by-id";

export async function getRoleById(id: string) {
  return selectRoleById(id);
}
