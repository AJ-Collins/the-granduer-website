import { updateEventType as updateEventTypeRow } from "../../persistence/queries/update-event-type";
import type { EventPatch } from "../../requests/read-event-patch-body";

export async function updateEventType(id: string, patch: EventPatch) {
  return updateEventTypeRow(id, patch);
}
