import { db } from "../../db/client";

export async function getOutboxEntry(id: string) {
  const row = await db.notificationOutbox.findUnique({ where: { id } });
  return row ? { ...row, status: row.status.toLowerCase() } : null;
}
