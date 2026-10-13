import { cookies } from "next/headers";
import { refreshCookieOptions } from "./refresh-cookie-options";
import { sessionCookieOptions } from "./session-cookie-options";
import { ACCESS_TOKEN_TTL_SECONDS } from "./access-token-ttl";
import { REFRESH_TOKEN_TTL_SECONDS } from "./refresh-token-ttl";

export async function setSessionCookies(accessToken: string, refreshToken: string): Promise<void> {
  const jar = await cookies();
  jar.set("dgrandeur_session", accessToken, sessionCookieOptions(ACCESS_TOKEN_TTL_SECONDS));
  jar.set("dgrandeur_refresh", refreshToken, refreshCookieOptions(REFRESH_TOKEN_TTL_SECONDS));
}
