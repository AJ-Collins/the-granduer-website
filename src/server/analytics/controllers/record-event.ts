import { ok } from "../../http/ok-response";
import { parseBody } from "../../http/parse-body";
import { analyticsEventSchema } from "../requests/read-analytics-event-body";
import { recordEvent } from "../services/record-event";

export async function recordEventController(req: Request): Promise<Response> {
  const parsed = await parseBody(req, analyticsEventSchema);
  if ("response" in parsed) return parsed.response;
  return ok(await recordEvent(parsed.data), { status: 201 });
}
