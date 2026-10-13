import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getEventType } from "../../services/events/get-event-type";

export async function getEventTypeController(slug: string, publishedOnly: boolean): Promise<Response> {
  const event = await getEventType(slug, publishedOnly);
  if (!event) return fail("NOT_FOUND", "Event type not found", { status: 404 });
  return ok(event);
}
