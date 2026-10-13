import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import type { OutboxFilter } from "../types";

export async function selectOutboxEntries(page: number, pageSize: number, filter?: OutboxFilter) {
  const where: Prisma.NotificationOutboxWhereInput = {
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
  return { items: rows.map((r) => ({ ...r, status: r.status.toLowerCase() })), total };
}
