import { selectOutboxEntry } from "../persistence/queries/select-outbox-entry";

export async function getOutboxEntry(id: string) {
  return selectOutboxEntry(id);
}
