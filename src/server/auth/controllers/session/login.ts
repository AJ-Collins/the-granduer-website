import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { enforceRateLimit } from "../../../rate-limit/enforce-rate-limit";
import { authenticateUser } from "../../services/login/authenticate-user";
import { createSession } from "../../services/sessions/create-session";
import { createSessionToken } from "../../services/sessions/create-session-token";
import { getAuthSecret } from "../../services/sessions/get-auth-secret";
import { InvalidCredentialsError } from "../../services/login/invalid-credentials-error";
import { setSessionCookies } from "../../services/sessions/set-session-cookies";
import { loginBodySchema } from "../../requests/read-login-body";

export async function login(req: Request): Promise<Response> {
  const parsed = await parseBody(req, loginBodySchema);
  if ("response" in parsed) return parsed.response;
  const limit = await enforceRateLimit(req, ["auth-login", "auth-login-ip"], {
    email: parsed.data.email,
  });
  if (limit.blocked) return limit.blocked;
  try {
    const account = await authenticateUser(parsed.data.email, parsed.data.password);
    const { sessionId, refreshToken } = await createSession(account.id);
    const accessToken = await createSessionToken(
      { sub: account.id, sid: sessionId, roles: account.roles, permissions: account.permissions },
      getAuthSecret(),
    );
    await setSessionCookies(accessToken, refreshToken);
    return ok({
      account: {
        id: account.id,
        email: account.email,
        roles: account.roles,
        permissions: account.permissions,
      },
    });
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return fail("INVALID_CREDENTIALS", e.message, { status: e.status });
    }
    throw e;
  }
}
