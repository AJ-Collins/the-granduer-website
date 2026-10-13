import { db } from "../../db/client";
import { toEventType } from "./list-event-types";
import type { EventInput, EventPatch } from "../requests/read-event-body";
import type { PublishState } from "./catalog-types";

export async function getEventType(slug: string, publishedOnly: boolean) {
  const row = await db.eventType.findUnique({ where: { slug } });
  if (!row) return null;
  const event = toEventType(row);
  if (publishedOnly && event.status !== "published") return null;
  return event;
}

export async function createEventType(input: EventInput) {
  return toEventType(
    await db.eventType.create({
      data: { ...input, description: input.description ?? null, sortOrder: input.sortOrder ?? 0 },
    }),
  );
}

export async function updateEventType(id: string, patch: EventPatch) {
  return toEventType(await db.eventType.update({ where: { id }, data: patch }));
}

export async function setEventTypeStatus(id: string, status: PublishState) {
  return toEventType(
    await db.eventType.update({
      where: { id },
      data: { status: status.toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED" },
    }),
  );
}
