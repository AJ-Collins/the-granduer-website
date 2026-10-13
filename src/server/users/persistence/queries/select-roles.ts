import { db } from "../../../db/client";

export async function selectRoles() {
  const rows = await db.role.findMany({ orderBy: { key: "asc" } });
  return rows.map((r) => ({ id: r.id, key: r.key, label: r.label, permissions: r.permissions }));
}
