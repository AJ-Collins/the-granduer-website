import { z } from "zod";
import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import type { SessionUser } from "../../auth/services/session-claims";
import { assignEnquiry } from "../services/manage-enquiries";

const assignSchema = z.object({ assignedToId: z.string().min(1).max(64).nullable() });

export async function assignEnquiryController(
  req: Request,
  id: string,
  user: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, assignSchema);
  if ("response" in parsed) return parsed.response;
  const updated = await assignEnquiry(id, parsed.data.assignedToId, user.id);
  if (!updated) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
  return ok(updated);
}
