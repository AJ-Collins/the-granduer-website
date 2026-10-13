import { db } from "../../db/client";

export async function setUserStatus(id: string, status: "active" | "suspended" | "deactivated") {
  const row = await db.account.update({
    where: { id },
    data: { status: status.toUpperCase() as "ACTIVE" | "SUSPENDED" | "DEACTIVATED" },
    include: { roles: { include: { role: true } } },
  });
  await db.session.updateMany({ where: { userId: id, revokedAt: null }, data: { revokedAt: new Date() } });
  return {
    id: row.id,
    email: row.email,
    status: row.status.toLowerCase(),
    roles: row.roles.map((x) => x.role.key),
  };
}
