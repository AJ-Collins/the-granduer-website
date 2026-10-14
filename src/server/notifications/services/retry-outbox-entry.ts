import { retryOutboxEntry as retryRecord } from "../persistence/transactions/retry-outbox-entry-with-audit";

export async function retryOutboxEntry(id: string, actorId: string) {
  return retryRecord(id, actorId);
}
