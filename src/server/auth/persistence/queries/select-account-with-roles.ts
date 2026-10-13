import { db } from "../../../db/client";

const WITH_ROLES = { roles: { include: { role: true } } } as const;

export async function selectAccountWithRoles(userId: string) {
  const account = await db.account.findUnique({ where: { id: userId }, include: WITH_ROLES });
  if (!account) return null;
  return {
    id: account.id,
    status: account.status,
    roles: account.roles.map((r) => r.role.key),
    permissions: [...new Set(account.roles.flatMap((r) => r.role.permissions))],
  };
}
