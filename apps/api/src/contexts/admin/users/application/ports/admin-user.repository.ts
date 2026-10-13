import type { AdminUser, AdminUserStatus } from "../../domain/entities/admin-user.js";

export interface AdminUserRepository {
  findById(id: string): Promise<AdminUser | null>;
  list(
    page: number,
    pageSize: number,
    filter?: { status?: AdminUserStatus; search?: string },
  ): Promise<{ items: AdminUser[]; total: number }>;
  create(input: {
    email: string;
    passwordHash: string;
    name?: string;
    roleKeys: string[];
  }): Promise<AdminUser>;
  setStatus(id: string, status: AdminUserStatus): Promise<AdminUser>;
  setRoles(id: string, roleKeys: string[]): Promise<AdminUser>;
}
