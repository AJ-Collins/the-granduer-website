import { db } from "../../db/client";
import type { FaqBody } from "../requests/read-faq-body";

const ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

export async function listFaqs(publishedOnly: boolean) {
  const rows = await db.faq.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map((r) => ({ ...r, status: r.status.toLowerCase() }));
}

export async function upsertFaq(id: string | null, input: FaqBody) {
  const status = (input.status ?? "draft").toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const data = {
    question: input.question,
    answer: input.answer,
    category: input.category ?? null,
    status,
    sortOrder: input.sortOrder ?? 0,
  };
  const row = id
    ? await db.faq.update({ where: { id }, data })
    : await db.faq.create({ data });
  return { ...row, status: row.status.toLowerCase() };
}
