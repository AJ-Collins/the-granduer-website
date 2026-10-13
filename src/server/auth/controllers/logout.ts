import { ok } from "../../http/api-response";
import { clearSessionCookies } from "../services/clear-session-cookies";
import { getSessionUser } from "../services/get-session-user";
import { revokeSession } from "../services/revoke-session";

export async function logout(req: Request): Promise<Response> {
  const user = await getSessionUser(req);
  const refresh = readCookie(req, "dgrandeur_refresh");
  if (refresh) await revokeSession(refresh);
  await clearSessionCookies();
  void user;
  return ok({ loggedOut: true });
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
