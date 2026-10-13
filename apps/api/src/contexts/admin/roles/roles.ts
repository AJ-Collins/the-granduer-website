import { db } from "@dgrandeur/db";
import type { Role } from "./role.js";

export interface RoleRepository {
  list(): Promise<Role[]>;
}

export class PrismaRoleRepository implements RoleRepository {
  async list(): Promise<Role[]> {
    const rows = await db.role.findMany({ orderBy: { key: "asc" } });
    return rows.map((r) => ({ id: r.id, key: r.key, label: r.label, permissions: r.permissions }));
  }
}

export function makeListRoles(repo: RoleRepository) {
  return () => repo.list();
}

export type ListRoles = ReturnType<typeof makeListRoles>;
