// Admin boundary for user management. Import only from here.
export type { AdminUser, AdminUserStatus } from "./domain/entities/admin-user.js";
export type { AdminUserRepository } from "./application/ports/admin-user.repository.js";
export { adminUsersModule } from "./users.module.js";
