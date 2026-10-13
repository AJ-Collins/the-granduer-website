import { upsertContentBlockRow } from "../../persistence/queries/upsert-content-block";
import type { ContentBody } from "../../requests/read-content-body";

export async function upsertContentBlock(input: ContentBody) {
  return upsertContentBlockRow(input);
}
