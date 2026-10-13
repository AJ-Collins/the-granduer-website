import { fail, ok } from "../../http/api-response";
import { db } from "../../db/client";
import { createSessionToken } from "../services/create-session-token";
import { getAuthSecret } from "../services/get-auth-secret";
import { RefreshRejectedError } from "../services/refresh-rejected-error";
import { rotateSession } from "../services/rotate-session";
import { setSessionCookies } from "../services/set-session-cookies";
import { clearSessionCookies } from "../services/clear-session-cookies";
import { enforceRateLimit } from "../../rate-limit/enforce-rate-limit";

export async function refresh(req: Request): Promise<Response> {
  const token = readCookie(req, "dgrandeur_refresh");
  if (!token) return fail("SESSION_EXPIRED", "No refresh token", { status: 401 });
  const limit = await enforceRateLimit(req, ["auth-refresh"], { tokenHash: token.slice(0, 16) });
  if (limit.blocked) return limit.blocked;
  try {
    const { sessionId, refreshToken, userId } = await rotateSession(token);
    const account = await db.account.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } },
    });
    if (!account || account.status !== "ACTIVE") {
      await clearSessionCookies();
      return fail("SESSION_EXPIRED", "Account is not active", { status: 401 });
    }
    const roles = account.roles.map((r) => r.role.key);
    const permissions = [...new Set(account.roles.flatMap((r) => r.role.permissions))];
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

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}
