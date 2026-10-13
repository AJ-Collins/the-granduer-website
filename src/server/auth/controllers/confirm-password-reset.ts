import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { enforceRateLimit } from "../../rate-limit/enforce-rate-limit";
import { passwordResetBodySchema } from "../requests/read-password-reset-body";
import { InvalidResetTokenError } from "../services/invalid-reset-token-error";
import { resetPassword } from "../services/reset-password";

export async function confirmPasswordReset(req: Request): Promise<Response> {
  const parsed = await parseBody(req, passwordResetBodySchema);
  if ("response" in parsed) return parsed.response;
  const limit = await enforceRateLimit(req, ["password-reset"], {});
  if (limit.blocked) return limit.blocked;
  try {
    await resetPassword(parsed.data.token, parsed.data.newPassword);
    return ok({ reset: true });
  } catch (e) {
    if (e instanceof InvalidResetTokenError) {
      return fail("INVALID_TOKEN", e.message, { status: e.status });
    }
    throw e;
  }
}
