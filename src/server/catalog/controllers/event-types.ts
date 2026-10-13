import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { getEventType } from "../services/manage-event-types";
import { listEventTypes } from "../services/list-event-types";
import { createEventType, setEventTypeStatus, updateEventType } from "../services/manage-event-types";
import { eventBodySchema, eventPatchSchema } from "../requests/read-event-body";
import { z } from "zod";

export async function listEventTypesController(publishedOnly: boolean): Promise<Response> {
  return ok(await listEventTypes(publishedOnly));
}

export async function getEventTypeController(slug: string, publishedOnly: boolean): Promise<Response> {
  const event = await getEventType(slug, publishedOnly);
  if (!event) return fail("NOT_FOUND", "Event type not found", { status: 404 });
  return ok(event);
}

export async function createEventTypeController(req: Request): Promise<Response> {
  const parsed = await parseBody(req, eventBodySchema);
  if ("response" in parsed) return parsed.response;
  return ok(await createEventType(parsed.data), { status: 201 });
}

export async function updateEventTypeController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, eventPatchSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await updateEventType(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Event type not found", { status: 404 });
  }
}

const statusSchema = z.object({ status: z.enum(["draft", "published", "archived"]) });

export async function setEventTypeStatusController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, statusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await setEventTypeStatus(id, parsed.data.status));
  } catch {
    return fail("NOT_FOUND", "Event type not found", { status: 404 });
  }
}
