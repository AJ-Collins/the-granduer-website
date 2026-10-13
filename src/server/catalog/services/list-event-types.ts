import { db } from "../../db/client";
import type { EventType } from "./catalog-types";

const ORDER = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

type Row = {
  id: string; slug: string; name: string; description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; sortOrder: number;
};

export function toEventType(row: Row): EventType {
  return { ...row, status: row.status.toLowerCase() as EventType["status"] };
}

export async function listEventTypes(publishedOnly: boolean): Promise<EventType[]> {
  const rows = await db.eventType.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(toEventType);
}
