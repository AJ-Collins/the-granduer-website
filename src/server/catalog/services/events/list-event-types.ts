import { selectEventTypes } from "../../persistence/queries/select-event-types";
import type { EventType } from "../../persistence/rows";

export async function listEventTypes(publishedOnly: boolean): Promise<EventType[]> {
  return selectEventTypes(publishedOnly);
}
