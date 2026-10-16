import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { InvalidStageTransitionError } from "../../services/errors/invalid-stage-transition-error";
import { advanceOpportunityStage } from "../../services/opportunities/advance-opportunity-stage";
import { opportunityStageSchema } from "../../requests/read-opportunity-stage-body";

export async function advanceOpportunityStageController(
  req: Request,
  id: string,
  user: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, opportunityStageSchema);
  if ("response" in parsed) return parsed.response;
  try {
    const updated = await advanceOpportunityStage(id, parsed.data.stage, user.id, parsed.data.notes);
    if (!updated) return fail("NOT_FOUND", "Opportunity not found", { status: 404 });
    return ok(updated);
  } catch (e) {
    if (e instanceof InvalidStageTransitionError) {
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
