import { insertEventType } from "../../persistence/queries/insert-event-type";
import type { EventInput } from "../../requests/read-event-body";

export async function createEventType(input: EventInput) {
  return insertEventType(input);
}
