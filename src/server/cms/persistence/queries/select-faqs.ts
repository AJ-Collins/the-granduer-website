import { db } from "../../../db/client";
import { published } from "../rows";

const ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

export async function selectFaqs(publishedOnly: boolean) {
  const rows = await db.faq.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(published);
}
