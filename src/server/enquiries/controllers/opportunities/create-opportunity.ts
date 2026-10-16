import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { createOpportunity } from "../../services/opportunities/create-opportunity";
import { createOpportunitySchema } from "../../requests/read-opportunity-body";

export async function createOpportunityController(req: Request, user: SessionUser): Promise<Response> {
  const parsed = await parseBody(req, createOpportunitySchema);
  if ("response" in parsed) return parsed.response;
  const created = await createOpportunity(parsed.data.enquiryId, user.id, parsed.data.notes);
  if (!created) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
  return ok(created, { status: 201 });
}
