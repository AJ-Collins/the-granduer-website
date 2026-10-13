import { db } from "@dgrandeur/db";

/**
 * Shared audit port + Prisma adapter. Lives in shared/ (not a business
 * context) because every context records the same audit entries.
 */
export type AuditEntry = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: unknown;
};

export interface AuditWriter {
  record(entry: AuditEntry): Promise<void>;
}

export class PrismaAuditWriter implements AuditWriter {
  async record(entry: AuditEntry): Promise<void> {
    await db.auditLog.create({
      data: {
        actorId: entry.actorId ?? null,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId ?? null,
        metadata: entry.metadata === undefined ? undefined : (entry.metadata as object),
      },
    });
  }
}

export type AuditRecord = {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: Date;
};

export function makeListAuditLogs() {
  return async function listAuditLogs(
    page: number,
    pageSize: number,
    filter?: { entityType?: string; entityId?: string },
  ): Promise<{ items: AuditRecord[]; total: number }> {
    const where = {
      ...(filter?.entityType && { entityType: filter.entityType }),
      ...(filter?.entityId && { entityId: filter.entityId }),
    };
    const [rows, total] = await Promise.all([
      db.auditLog.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
      db.auditLog.count({ where }),
    ]);
    return { items: rows, total };
  };
}

export type ListAuditLogs = ReturnType<typeof makeListAuditLogs>;
