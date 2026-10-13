import { fail } from "../../http/api-response";
import type { SessionUser } from "./session-claims";
import { getSessionUser } from "./get-session-user";

/** Controller entry: 401 Response when there is no live session. */
export async function requireUser(req: Request): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return fail("UNAUTHORIZED", "Not authenticated", { status: 401 });
  return user;
}
