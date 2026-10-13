import { z } from "zod";
import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import type { SessionUser } from "../../auth/services/session-claims";
import { InvalidEnquiryTransitionError } from "../services/enquiry-status";
import { setEnquiryStatus } from "../services/manage-enquiries";

const statusSchema = z.object({
  status: z.enum(["new", "assigned", "contacted", "closed"]),
  notes: z.string().max(5000).optional(),
});

export async function updateEnquiryStatusController(
  req: Request,
  id: string,
  user: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, statusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    const updated = await setEnquiryStatus(id, parsed.data.status, user.id, parsed.data.notes);
    if (!updated) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
    return ok(updated);
  } catch (e) {
    if (e instanceof InvalidEnquiryTransitionError) {
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
