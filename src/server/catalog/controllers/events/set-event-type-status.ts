import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { setEventTypeStatus } from "../../services/events/set-event-type-status";

import { publishStatusSchema } from "../../requests/read-status-body";

export async function setEventTypeStatusController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, publishStatusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await setEventTypeStatus(id, parsed.data.status));
  } catch {
    return fail("NOT_FOUND", "Event type not found", { status: 404 });
  }
}
