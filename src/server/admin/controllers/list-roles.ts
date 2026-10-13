import { db } from "../../db/client";
import { ok } from "../../http/api-response";

export async function listRolesController(): Promise<Response> {
  const rows = await db.role.findMany({ orderBy: { key: "asc" } });
  return ok(rows.map((r) => ({ id: r.id, key: r.key, label: r.label, permissions: r.permissions })));
}
