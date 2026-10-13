import { ok } from "../../../http/ok-response";
import { listEventTypes } from "../../services/events/list-event-types";

export async function listEventTypesController(publishedOnly: boolean): Promise<Response> {
  return ok(await listEventTypes(publishedOnly));
}
