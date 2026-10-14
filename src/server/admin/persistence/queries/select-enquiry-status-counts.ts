import { db } from "../../../db/client";

export async function selectEnquiryStatusCounts() {
  const total = await db.enquiry.count();
  if (total === 0) return { total, statusCounts: [] as { status: string; count: number }[] };
  const rows = await db.enquiry.groupBy({ by: ["status"], _count: { id: true } });
  return { total, statusCounts: rows.map((s) => ({ status: s.status, count: s._count.id })) };
}
