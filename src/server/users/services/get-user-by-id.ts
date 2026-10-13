import { selectUserById } from "../persistence/queries/select-user-by-id";

export async function getUserById(id: string) {
  return selectUserById(id);
}
