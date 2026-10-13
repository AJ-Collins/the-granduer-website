import type { EventType, StoredEventRow } from "../rows";

export function toEventType(row: StoredEventRow): EventType {
  return { ...row, status: row.status.toLowerCase() as EventType["status"] };
}
