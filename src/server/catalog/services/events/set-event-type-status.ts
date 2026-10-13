import { updateEventTypeStatus } from "../../persistence/queries/update-event-type-status";
import type { PublishState } from "../../persistence/rows";

export async function setEventTypeStatus(id: string, status: PublishState) {
  return updateEventTypeStatus(id, status);
}
