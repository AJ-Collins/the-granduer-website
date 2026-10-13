import { db } from "../../../db/client";
import type { EventTypeCreateInput } from "./insert-event-type";

export async function upsertSeedEventType(input: EventTypeCreateInput & { published: boolean }) {
  const { published, ...data } = input;
  await db.eventType.upsert({
    where: { slug: data.slug },
    update: {},
    create: {
      ...data,
      description: data.description ?? null,
      sortOrder: data.sortOrder ?? 0,
      status: published ? "PUBLISHED" : "DRAFT",
    },
  });
}
