import { markRecordFailed } from "../persistence/queries/mark-record-failed";

export async function failIdempotencyKey(recordId: string, error: string): Promise<void> {
  await markRecordFailed(recordId, error);
}
