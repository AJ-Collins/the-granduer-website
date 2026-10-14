import { db } from "../../../db/client";

export async function selectIdempotencyRecord(scope: string, actor: string, key: string) {
  return db.idempotencyRecord.findUnique({ where: { scope_actor_key: { scope, actor, key } } });
}
