import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { enforceRateLimit } from "../../rate-limit/enforce-rate-limit";
import { authenticateUser } from "../services/authenticate-user";
import { createSession } from "../services/create-session";
import { createSessionToken } from "../services/create-session-token";
import { getAuthSecret } from "../services/get-auth-secret";
import { InvalidCredentialsError } from "../services/invalid-credentials-error";
import { setSessionCookies } from "../services/set-session-cookies";
import { loginBodySchema } from "../requests/read-login-body";

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
