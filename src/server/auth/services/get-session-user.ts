import { db } from "../../db/client";
import type { SessionUser } from "./session-claims";
import { verifySessionToken } from "./verify-session-token";
import { getAuthSecret } from "./get-auth-secret";

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
  const [session, account] = await Promise.all([
    db.session.findUnique({ where: { id: claims.sid } }),
    db.account.findUnique({
      where: { id: claims.sub },
      include: { roles: { include: { role: true } } },
    }),
  ]);
  if (!session || session.revokedAt || session.expiresAt <= new Date()) return null;
  if (!account || account.status !== "ACTIVE") return null;
  return {
    id: account.id,
    email: account.email,
    roles: account.roles.map((r) => r.role.key),
    permissions: [...new Set(account.roles.flatMap((r) => r.role.permissions))],
    sessionId: session.id,
  };
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
