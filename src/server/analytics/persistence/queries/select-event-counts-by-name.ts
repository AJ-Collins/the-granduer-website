import { db } from "../../../db/client";

export async function selectEventCountsByName() {
  const rows = await db.analyticsEvent.groupBy({
    by: ["eventName"],
    _count: { id: true },
  });
  return rows.map((r) => ({ eventName: r.eventName, count: r._count.id }));
}
