import { db } from "../../db/client";
import { hashPassword } from "../../auth/services/hash-password";

export class UnknownRolesError extends Error {
  constructor(roles: string[]) {
    super(`Unknown roles: ${roles.join(", ")}`);
    this.name = "UnknownRolesError";
  }
}

export async function createUser(input: {
  email: string;
  password: string;
  name?: string;
  roleKeys: string[];
}) {
  const roles = await db.role.findMany({ where: { key: { in: input.roleKeys } } });
  const missing = input.roleKeys.filter((k) => !roles.some((r) => r.key === k));
  if (missing.length > 0) throw new UnknownRolesError(missing);
  const row = await db.account.create({
    data: {
      email: input.email.toLowerCase().trim(),
      passwordHash: await hashPassword(input.password),
      name: input.name ?? null,
      roles: { create: roles.map((r) => ({ roleId: r.id })) },
    },
    include: { roles: { include: { role: true } } },
  });
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase(),
    roles: row.roles.map((x) => x.role.key),
  };
}
