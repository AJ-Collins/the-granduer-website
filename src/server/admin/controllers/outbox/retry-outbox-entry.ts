import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { retryOutboxEntry } from "../../../notifications/services/retry-outbox-entry";

export async function retryOutboxEntryController(id: string, actor: SessionUser): Promise<Response> {
  try {
    const entry = await retryOutboxEntry(id, actor.id);
    if (!entry) return fail("NOT_FOUND", "Outbox entry not found", { status: 404 });
    return ok(entry);
  } catch {
    return fail("BAD_REQUEST", "Only failed entries can be retried", { status: 400 });
  }
}
