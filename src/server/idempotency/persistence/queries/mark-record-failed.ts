import { db } from "../../../db/client";

export async function markRecordFailed(id: string, error: string) {
  await db.idempotencyRecord.update({
    where: { id },
    data: { status: "FAILED", lastError: error.slice(0, 500) },
  });
}
