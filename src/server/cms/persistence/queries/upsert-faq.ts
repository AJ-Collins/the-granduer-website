import { db } from "../../../db/client";
import { published } from "../mappers/to-published";
import type { FaqBody } from "../../requests/read-faq-body";

export async function upsertFaqRow(id: string | null, input: FaqBody) {
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
  return published(row);
}
