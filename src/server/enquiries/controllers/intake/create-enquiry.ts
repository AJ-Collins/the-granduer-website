import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { enforceRateLimit } from "../../../rate-limit/enforce-rate-limit";
import { enquiryBodySchema } from "../../requests/read-enquiry-body";
import { submitEnquiry, UnknownCatalogRefError } from "../../services/intake/submit-enquiry";

export async function createEnquiry(req: Request): Promise<Response> {
  const parsed = await parseBody(req, enquiryBodySchema);
  if ("response" in parsed) return parsed.response;
  const limit = await enforceRateLimit(req, ["enquiry-ip"], { email: parsed.data.email });
  if (limit.blocked) return limit.blocked;
  try {
    return ok(await submitEnquiry(parsed.data), { status: 201 });
  } catch (e) {
    if (e instanceof UnknownCatalogRefError) {
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
