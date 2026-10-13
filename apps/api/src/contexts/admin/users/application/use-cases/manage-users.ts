import { hashPassword } from "@dgrandeur/auth";
import { badRequest, conflict, notFound } from "../../../../../core/errors/app-error.js";
import type { AuditWriter } from "../../../../../shared/audit/audit-log.js";
import type { AdminUserStatus } from "../../domain/entities/admin-user.js";
import type { AdminUserRepository } from "../ports/admin-user.repository.js";

export function makeCreateAdminUser(repo: AdminUserRepository, audit: AuditWriter) {
  return async function createAdminUser(
    input: { email: string; password: string; name?: string; roleKeys: string[] },
    actorId: string,
  ) {
    const email = input.email.toLowerCase().trim();
    try {
      const created = await repo.create({
        email,
        passwordHash: await hashPassword(input.password),
        name: input.name,
        roleKeys: input.roleKeys,
      });
      await audit.record({ actorId, action: "admin.user-created", entityType: "account", entityId: created.id, metadata: { email } });
      return created;
    } catch (e) {
      if (e instanceof Error && e.message.startsWith("Unknown roles")) throw badRequest(e.message);
      throw conflict("An account with this email already exists");
    }
  };
}

export type CreateAdminUser = ReturnType<typeof makeCreateAdminUser>;

export function makeSetAdminUserStatus(repo: AdminUserRepository, audit: AuditWriter) {
  return async function setAdminUserStatus(id: string, status: AdminUserStatus, actorId: string) {
    if (id === actorId && status !== "active") {
      throw badRequest("You cannot deactivate your own account");
    }
    try {
      const updated = await repo.setStatus(id, status);
      await audit.record({ actorId, action: "admin.user-status-changed", entityType: "account", entityId: id, metadata: { to: status } });
      return updated;
    } catch {
      throw notFound("Admin user");
    }
  };
}

export type SetAdminUserStatus = ReturnType<typeof makeSetAdminUserStatus>;

export function makeSetAdminUserRoles(repo: AdminUserRepository, audit: AuditWriter) {
  return async function setAdminUserRoles(id: string, roleKeys: string[], actorId: string) {
    try {
      const updated = await repo.setRoles(id, roleKeys);
      await audit.record({ actorId, action: "admin.user-roles-changed", entityType: "account", entityId: id, metadata: { roles: roleKeys } });
      return updated;
    } catch (e) {
      if (e instanceof Error && e.message.startsWith("Unknown roles")) throw badRequest(e.message);
      throw notFound("Admin user");
    }
  };
}

export type SetAdminUserRoles = ReturnType<typeof makeSetAdminUserRoles>;
