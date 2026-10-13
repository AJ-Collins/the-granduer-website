import { db } from "../../../db/client";
import { toEventType } from "../mappers/to-event-type";
import type { EventTypeCreateInput } from "./insert-event-type";

export async function updateEventType(id: string, patch: Partial<EventTypeCreateInput>) {
  return toEventType(await db.eventType.update({ where: { id }, data: patch }));
}
