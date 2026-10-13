import { db } from "../../../db/client";
import { toEventType } from "../mappers/to-event-type";

export type EventTypeCreateInput = {
  slug: string;
  name: string;
  description?: string | null;
  sortOrder?: number;
};

export async function insertEventType(input: EventTypeCreateInput) {
  return toEventType(
    await db.eventType.create({
      data: { ...input, description: input.description ?? null, sortOrder: input.sortOrder ?? 0 },
    }),
  );
}
