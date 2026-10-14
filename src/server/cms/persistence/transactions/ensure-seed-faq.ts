import { selectFaqByQuestion } from "../queries/select-faq-by-question";
import { upsertFaqRow } from "../queries/upsert-faq";
import type { FaqBody } from "../../requests/read-faq-body";

export async function ensureSeedFaq(input: FaqBody & { sortOrder: number }) {
  const existing = await selectFaqByQuestion(input.question);
  if (!existing) await upsertFaqRow(null, input);
}
