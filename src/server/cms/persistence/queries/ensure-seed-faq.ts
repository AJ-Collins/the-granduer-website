import { db } from "../../../db/client";
import { upsertFaqRow } from "./upsert-faq";
import type { FaqBody } from "../../requests/read-faq-body";

export async function ensureSeedFaq(input: FaqBody & { sortOrder: number }) {
  const existing = await db.faq.findFirst({ where: { question: input.question } });
  if (!existing) await upsertFaqRow(null, input);
}
