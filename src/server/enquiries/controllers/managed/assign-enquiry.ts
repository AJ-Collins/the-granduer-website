import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { assignManagedEnquiry } from "../../services/managed/assign-managed-enquiry";
import { assignEnquirySchema } from "../../requests/read-assign-body";

export async function assignEnquiryController(
  req: Request,
  id: string,
  user: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, assignEnquirySchema);
  if ("response" in parsed) return parsed.response;
  const updated = await assignManagedEnquiry(id, parsed.data.assignedToId, user.id);
  if (!updated) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
  return ok(updated);
}
