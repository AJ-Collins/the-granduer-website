import type { SessionUser } from "./session-claims";
import { verifySessionToken } from "./verify-session-token";
import { getAuthSecret } from "./get-auth-secret";
import { selectLiveSession } from "../../persistence/queries/select-live-session";

/** Reads the access cookie, verifies it, and confirms the session row is live. */
export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const token = readCookie(req, "dgrandeur_session");
  if (!token) return null;
  let claims;
  try {
    claims = await verifySessionToken(token, getAuthSecret());
  } catch {
    return null;
  }
  const live = await selectLiveSession(claims.sid, claims.sub);
  if (!live) return null;
  return { ...live };
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
