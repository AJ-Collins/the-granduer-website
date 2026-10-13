import { db } from "../../db/client";
import {
  insertAuditEntry,
  type AuditWriter,
} from "../persistence/queries/insert-audit-entry";
import type { AuditEntryInput } from "../persistence/types";

export type AuditEntry = AuditEntryInput;

export async function recordAudit(entry: AuditEntry, tx?: AuditWriter): Promise<void> {
  await insertAuditEntry(entry, tx ?? db);
}
