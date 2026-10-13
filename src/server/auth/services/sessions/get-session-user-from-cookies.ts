import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getSessionUser } from "./get-session-user";
import type { SessionUser } from "./session-claims";

/** Layout/server-component entry: builds the cookie header from next/headers. */
export async function getSessionUserFromCookies(
  jar: Pick<ReadonlyRequestCookies, "getAll">,
): Promise<SessionUser | null> {
  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  return getSessionUser(new Request("http://localhost/", { headers: { cookie: cookieHeader } }));
}
