import { db } from "../../db/client";

export type OutboxFilter = { status?: string; type?: string };

export async function listOutboxEntries(page: number, pageSize: number, filter?: OutboxFilter) {
  const where = {
    ...(filter?.status && {
      status: filter.status.toUpperCase() as "PENDING" | "SENDING" | "SENT" | "FAILED",
    }),
    ...(filter?.type && { type: filter.type }),
  };
  const [rows, total] = await Promise.all([
    db.notificationOutbox.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.notificationOutbox.count({ where }),
  ]);
  return {
    items: rows.map((r) => ({ ...r, status: r.status.toLowerCase() })),
    total,
  };
}
