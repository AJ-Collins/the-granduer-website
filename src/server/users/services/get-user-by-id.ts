import { db } from "../../db/client";

export async function getUserById(id: string) {
  const row = await db.account.findUnique({
    where: { id },
    include: { roles: { include: { role: true } } },
  });
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase(),
    roles: row.roles.map((x) => x.role.key),
    permissions: [...new Set(row.roles.flatMap((x) => x.role.permissions))],
  };
}
