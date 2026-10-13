import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { updateEventType } from "../../services/events/update-event-type";
import { eventPatchSchema } from "../../requests/read-event-patch-body";

export async function updateEventTypeController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, eventPatchSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await updateEventType(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Event type not found", { status: 404 });
  }
}
