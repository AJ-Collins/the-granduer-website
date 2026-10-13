import { SignJWT } from "jose";
import type { AccessClaims } from "./session-claims";
import { ACCESS_TOKEN_TTL_SECONDS } from "./token-ttl";

export async function createSessionToken(claims: AccessClaims, secret: string): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ sid: claims.sid, roles: claims.roles, permissions: claims.permissions })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuer("dgrandeur")
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_TTL_SECONDS} seconds`)
    .sign(key);
}
