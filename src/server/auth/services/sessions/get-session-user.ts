import type { SessionUser } from "./session-claims";
import { verifySessionToken } from "./verify-session-token";
import { getAuthSecret } from "./get-auth-secret";
import { selectLiveSession } from "../../persistence/queries/select-live-session";
import { readCookie } from "../../requests/read-cookie";

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
