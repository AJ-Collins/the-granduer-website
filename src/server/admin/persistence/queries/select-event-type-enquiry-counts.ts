import { db } from "../../../db/client";

export async function selectEventTypeEnquiryCounts() {
  return db.eventType.findMany({
    take: 6,
    select: { id: true, name: true, _count: { select: { enquiries: true } } },
  });
}
