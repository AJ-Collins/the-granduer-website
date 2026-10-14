import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { readCookie } from "../../requests/read-cookie";
import { createSessionToken } from "../../services/sessions/create-session-token";
import { getAccountWithRoles } from "../../services/sessions/get-account-with-roles";
import { getAuthSecret } from "../../services/sessions/get-auth-secret";
import { RefreshRejectedError } from "../../services/sessions/refresh-rejected-error";
import { rotateSession } from "../../services/sessions/rotate-session";
import { setSessionCookies } from "../../services/sessions/set-session-cookies";
import { clearSessionCookies } from "../../services/sessions/clear-session-cookies";
import { enforceRateLimit } from "../../../rate-limit/enforce-rate-limit";

export async function refresh(req: Request): Promise<Response> {
  const token = readCookie(req, "dgrandeur_refresh");
  if (!token) return fail("SESSION_EXPIRED", "No refresh token", { status: 401 });
  const limit = await enforceRateLimit(req, ["auth-refresh"], { tokenHash: token.slice(0, 16) });
  if (limit.blocked) return limit.blocked;
  try {
    const { sessionId, refreshToken, userId } = await rotateSession(token);
    const account = await getAccountWithRoles(userId);
    if (!account || account.status !== "ACTIVE") {
      await clearSessionCookies();
      return fail("SESSION_EXPIRED", "Account is not active", { status: 401 });
    }
    const { roles, permissions } = account;
    await setSessionCookies(
      await createSessionToken({ sub: account.id, sid: sessionId, roles, permissions }, getAuthSecret()),
      refreshToken,
    );
    return ok({ refreshed: true });
  } catch (e) {
    if (e instanceof RefreshRejectedError) {
      await clearSessionCookies();
      return fail("SESSION_EXPIRED", e.message, { status: e.status });
    }
    throw e;
  }
}
