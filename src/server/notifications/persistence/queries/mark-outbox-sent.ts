import { db } from "../../../db/client";

export async function markOutboxSent(id: string) {
  await db.notificationOutbox.update({
    where: { id },
    data: { status: "SENT", sentAt: new Date(), lastError: null },
  });
}
