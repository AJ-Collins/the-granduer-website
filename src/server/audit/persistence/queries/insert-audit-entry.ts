import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import type { AuditEntryInput } from "../types";

/** Narrow writer both `db` and interactive `tx` satisfy. */
export type AuditWriter = {
  auditLog: {
    create(args: { data: Prisma.AuditLogCreateInput }): Promise<unknown>;
  };
};

export async function insertAuditEntry(entry: AuditEntryInput, client?: AuditWriter) {
  const writer: AuditWriter = client ?? db;
  await writer.auditLog.create({
    data: {
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      metadata: (entry.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
      ...(entry.actorId ? { actor: { connect: { id: entry.actorId } } } : {}),
    },
  });
}
