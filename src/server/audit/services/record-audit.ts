import {
  insertAuditEntry,
  type AuditWriter,
} from "../persistence/queries/insert-audit-entry";
import type { AuditEntryInput } from "../persistence/types";

export type AuditEntry = AuditEntryInput;

export async function recordAudit(entry: AuditEntry, client: AuditWriter): Promise<void> {
  await insertAuditEntry(entry, client);
}
