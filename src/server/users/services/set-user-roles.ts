import { db } from "../../db/client";
import { UnknownRolesError } from "./create-user";

export async function setUserRoles(id: string, roleKeys: string[]) {
  const roles = await db.role.findMany({ where: { key: { in: roleKeys } } });
  const missing = roleKeys.filter((k) => !roles.some((r) => r.key === k));
  if (missing.length > 0) throw new UnknownRolesError(missing);
  await db.$transaction([
    db.accountRole.deleteMany({ where: { accountId: id } }),
    db.accountRole.createMany({ data: roles.map((r) => ({ accountId: id, roleId: r.id })) }),
  ]);
  const row = await db.account.findUniqueOrThrow({
    where: { id },
    include: { roles: { include: { role: true } } },
  });
  return {
    id: row.id,
    email: row.email,
    status: row.status.toLowerCase(),
    roles: row.roles.map((x) => x.role.key),
  };
}
