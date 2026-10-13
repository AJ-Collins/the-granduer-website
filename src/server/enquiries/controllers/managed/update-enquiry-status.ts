import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { InvalidEnquiryTransitionError } from "../../services/errors/invalid-enquiry-transition-error";
import { setManagedEnquiryStatus } from "../../services/managed/set-managed-enquiry-status";
import { enquiryStatusSchema } from "../../requests/read-enquiry-status-body";

export async function updateEnquiryStatusController(
  req: Request,
  id: string,
  user: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, enquiryStatusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    const updated = await setManagedEnquiryStatus(id, parsed.data.status, user.id, parsed.data.notes);
    if (!updated) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
    return ok(updated);
  } catch (e) {
    if (e instanceof InvalidEnquiryTransitionError) {
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
