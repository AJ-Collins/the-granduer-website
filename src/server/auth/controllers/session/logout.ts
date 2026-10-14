import { ok } from "../../../http/ok-response";
import { readCookie } from "../../requests/read-cookie";
import { clearSessionCookies } from "../../services/sessions/clear-session-cookies";
import { getSessionUser } from "../../services/sessions/get-session-user";
import { revokeSession } from "../../services/sessions/revoke-session";

export async function logout(req: Request): Promise<Response> {
  const user = await getSessionUser(req);
  const refresh = readCookie(req, "dgrandeur_refresh");
  if (refresh) await revokeSession(refresh);
  await clearSessionCookies();
  void user;
  return ok({ loggedOut: true });
}
