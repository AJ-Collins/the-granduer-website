import { selectUsers } from "../persistence/queries/select-users";

export async function listUsers(
  page: number,
  pageSize: number,
  filter?: { status?: string; search?: string },
) {
  return selectUsers(page, pageSize, filter);
}
