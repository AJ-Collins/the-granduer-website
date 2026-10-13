import { db } from "../../../db/client";

export async function upsertSeedRole(key: string, label: string, permissions: string[]) {
  await db.role.upsert({
    where: { key },
    update: { label, permissions },
    create: { key, label, permissions },
  });
}
