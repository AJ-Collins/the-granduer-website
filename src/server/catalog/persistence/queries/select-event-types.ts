import { db } from "../../../db/client";
import { toEventType } from "../mappers/to-event-type";

const ORDER = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

export async function selectEventTypes(publishedOnly: boolean) {
  const rows = await db.eventType.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(toEventType);
}
