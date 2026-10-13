import { db } from "../../db/client";

export async function listAuditLogs(
  page: number,
  pageSize: number,
  filter?: { entityType?: string; entityId?: string },
) {
  const where = {
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
