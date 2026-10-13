import { selectEventTypeBySlug } from "../../persistence/queries/select-event-type-by-slug";

export async function getEventType(slug: string, publishedOnly: boolean) {
  const event = await selectEventTypeBySlug(slug);
  if (!event) return null;
  if (publishedOnly && event.status !== "published") return null;
  return event;
}
