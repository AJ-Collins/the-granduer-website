import { db } from "../../../db/client";

export async function selectRoleById(id: string) {
  const row = await db.role.findUnique({ where: { id } });
  if (!row) return null;
  return { id: row.id, key: row.key, label: row.label, permissions: row.permissions };
}
