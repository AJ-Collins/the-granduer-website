import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getOpportunity } from "../../services/opportunities/get-opportunity";

export async function getOpportunityController(id: string): Promise<Response> {
  const opportunity = await getOpportunity(id);
  if (!opportunity) return fail("NOT_FOUND", "Opportunity not found", { status: 404 });
  return ok(opportunity);
}
