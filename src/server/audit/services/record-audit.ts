import { db } from "../../db/client";

export type AuditEntry = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: unknown;
};

export async function recordAudit(entry: AuditEntry): Promise<void> {
  await db.auditLog.create({
    data: {
      actorId: entry.actorId ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      metadata: (entry.metadata ?? undefined) as object | undefined,
    },
  });
}
