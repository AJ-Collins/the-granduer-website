import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { enforceRateLimit } from "../../rate-limit/enforce-rate-limit";
import { passwordRequestBodySchema } from "../requests/read-password-request-body";
import { requestPasswordReset } from "../services/request-password-reset";
import { TooManyResetRequestsError } from "../services/too-many-reset-requests-error";

export async function requestPasswordResetController(req: Request): Promise<Response> {
  const parsed = await parseBody(req, passwordRequestBodySchema);
  if ("response" in parsed) return parsed.response;
  const limit = await enforceRateLimit(req, ["password-request"], { email: parsed.data.email });
  if (limit.blocked) return limit.blocked;
  try {
    await requestPasswordReset(parsed.data.email);
    return ok({ sent: true });
  } catch (e) {
    if (e instanceof TooManyResetRequestsError) {
      return fail("RATE_LIMITED", e.message, { status: e.status, retryAfterSeconds: e.retryAfterSeconds });
    }
    throw e;
  }
}
