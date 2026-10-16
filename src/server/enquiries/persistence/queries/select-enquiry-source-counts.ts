import { db } from "../../../db/client";

export async function selectEnquirySourceCounts() {
  const rows = await db.enquiry.groupBy({
    by: ["trafficSource"],
    _count: { id: true },
  });
  return rows.map((r) => ({ source: r.trafficSource ?? "direct", leads: r._count.id }));
}
