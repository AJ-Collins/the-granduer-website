import { notFound } from "../../../../../core/errors/app-error.js";
import type { AdminUserRepository } from "../ports/admin-user.repository.js";

export function makeGetAdminUser(repo: AdminUserRepository) {
  return async function getAdminUser(id: string) {
    const user = await repo.findById(id);
    if (!user) throw notFound("Admin user");
    return user;
  };
}

export type GetAdminUser = ReturnType<typeof makeGetAdminUser>;
