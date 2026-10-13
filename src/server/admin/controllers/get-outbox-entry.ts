import { fail, ok } from "../../http/api-response";
import { getOutboxEntry } from "../../notifications/services/get-outbox-entry";

export async function getOutboxEntryController(id: string): Promise<Response> {
  const entry = await getOutboxEntry(id);
  if (!entry) return fail("NOT_FOUND", "Outbox entry not found", { status: 404 });
  return ok(entry);
}
