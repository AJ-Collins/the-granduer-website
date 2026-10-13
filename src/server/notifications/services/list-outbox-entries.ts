import { selectOutboxEntries } from "../persistence/queries/select-outbox-entries";

export async function listOutboxEntries(
  page: number,
  pageSize: number,
  filter?: { status?: string; type?: string },
) {
  return selectOutboxEntries(page, pageSize, filter);
}
