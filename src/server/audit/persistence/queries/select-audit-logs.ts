import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import type { AuditFilter } from "../types";

export async function selectAuditLogs(page: number, pageSize: number, filter?: AuditFilter) {
  const where: Prisma.AuditLogWhereInput = {
    ...(filter?.entityType && { entityType: filter.entityType }),
    ...(filter?.entityId && { entityId: filter.entityId }),
  };
  const [rows, total] = await Promise.all([
    db.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.auditLog.count({ where }),
  ]);
  return { items: rows, total };
}
