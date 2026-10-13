import { db } from "../../../db/client";
import { toEventType } from "../mappers/to-event-type";

export async function selectEventTypeBySlug(slug: string) {
  const row = await db.eventType.findUnique({ where: { slug } });
  return row ? toEventType(row) : null;
}
