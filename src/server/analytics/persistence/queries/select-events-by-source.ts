import { db } from "../../../db/client";

export async function selectEventsBySource() {
  const rows = await db.analyticsEvent.groupBy({
    by: ["source", "medium", "campaign"],
    _count: { id: true },
  });
  return rows.map((r) => ({
    source: r.source ?? "direct",
    medium: r.medium ?? "—",
    campaign: r.campaign ?? "—",
    events: r._count.id,
  }));
}
