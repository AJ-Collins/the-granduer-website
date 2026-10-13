import type { AdminUserRepository } from "../ports/admin-user.repository.js";

export function makeListAdminUsers(repo: AdminUserRepository) {
  return async function listAdminUsers(
    page: number,
    pageSize: number,
    filter?: { status?: "active" | "suspended" | "deactivated"; search?: string },
  ) {
    return repo.list(page, pageSize, filter);
  };
}

export type ListAdminUsers = ReturnType<typeof makeListAdminUsers>;
