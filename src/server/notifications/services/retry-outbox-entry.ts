import { retryOutboxEntry as retryRecord } from "../persistence/transactions/retry-outbox-entry";

export async function retryOutboxEntry(id: string, actorId: string) {
  return retryRecord(id, actorId);
}
