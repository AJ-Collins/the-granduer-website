import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { createEventType } from "../../services/events/create-event-type";
import { eventBodySchema } from "../../requests/read-event-body";

export async function createEventTypeController(req: Request): Promise<Response> {
  const parsed = await parseBody(req, eventBodySchema);
  if ("response" in parsed) return parsed.response;
  return ok(await createEventType(parsed.data), { status: 201 });
}
