import { db } from "@dgrandeur/db";
import type { AdminUser, AdminUserStatus } from "../../domain/entities/admin-user.js";
import type { AdminUserRepository } from "../../application/ports/admin-user.repository.js";

type Row = {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  roles: { role: { key: string } }[];
};

function toDomain(row: Row): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase() as AdminUserStatus,
    roles: row.roles.map((r) => r.role.key),
  };
}

const INCLUDE = { roles: { include: { role: true } } } as const;

export class PrismaAdminUserRepository implements AdminUserRepository {
  async findById(id: string): Promise<AdminUser | null> {
    const row = await db.account.findUnique({ where: { id }, include: INCLUDE });
    return row ? toDomain(row) : null;
  }

  async list(page: number, pageSize: number, filter?: { status?: AdminUserStatus; search?: string }) {
    const where = {
      ...(filter?.status && { status: filter.status.toUpperCase() as Row["status"] }),
      ...(filter?.search && {
        OR: [
          { email: { contains: filter.search, mode: "insensitive" as const } },
          { name: { contains: filter.search, mode: "insensitive" as const } },
        ],
      }),
    };
    const [rows, total] = await Promise.all([
      db.account.findMany({ where, include: INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
      db.account.count({ where }),
    ]);
    return { items: rows.map(toDomain), total };
  }

  async create(input: { email: string; passwordHash: string; name?: string; roleKeys: string[] }): Promise<AdminUser> {
    const roles = await db.role.findMany({ where: { key: { in: input.roleKeys } } });
    const found = new Set(roles.map((r) => r.key));
    const missing = input.roleKeys.filter((k) => !found.has(k));
    if (missing.length > 0) throw new Error(`Unknown roles: ${missing.join(", ")}`);
    const row = await db.account.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        name: input.name ?? null,
        roles: { create: roles.map((r) => ({ roleId: r.id })) },
      },
      include: INCLUDE,
    });
    return toDomain(row);
  }

  async setStatus(id: string, status: AdminUserStatus): Promise<AdminUser> {
    const row = await db.account.update({
      where: { id },
      data: { status: status.toUpperCase() as Row["status"] },
      include: INCLUDE,
    });
    return toDomain(row);
  }

  async setRoles(id: string, roleKeys: string[]): Promise<AdminUser> {
    const roles = await db.role.findMany({ where: { key: { in: roleKeys } } });
    const found = new Set(roles.map((r) => r.key));
    const missing = roleKeys.filter((k) => !found.has(k));
    if (missing.length > 0) throw new Error(`Unknown roles: ${missing.join(", ")}`);
    await db.accountRole.deleteMany({ where: { accountId: id } });
    await db.accountRole.createMany({ data: roles.map((r) => ({ accountId: id, roleId: r.id })) });
    const row = await db.account.findUniqueOrThrow({ where: { id }, include: INCLUDE });
    return toDomain(row);
  }
}
