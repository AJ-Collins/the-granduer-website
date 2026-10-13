import { upsertFaqRow } from "../../persistence/queries/upsert-faq";
import type { FaqBody } from "../../requests/read-faq-body";

export async function upsertFaq(id: string | null, input: FaqBody) {
  return upsertFaqRow(id, input);
}
