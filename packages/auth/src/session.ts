import { SignJWT, jwtVerify } from "jose";

/**
 * Mechanistic session tokens (JWT, HS256). This package knows NOTHING about
 * accounts, roles, or the database — the API's identity context decides what
 * claims to issue and how to validate them (see apps/api identity/sessions).
 */
export type SessionClaims = {
  /** Account id. */
  sub: string;
  roles: string[];
  permissions: string[];
  /** Account.tokenVersion at issue time — lets logout/password-change revoke tokens. */
  v: number;
};

const ISSUER = "dgrandeur-api";

export async function signSessionToken(
  claims: SessionClaims,
  secret: string,
  ttlSeconds = 12 * 3600,
): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ roles: claims.roles, permissions: claims.permissions, v: claims.v })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds} seconds`)
    .sign(key);
}

export async function verifySessionToken(token: string, secret: string): Promise<SessionClaims> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, { issuer: ISSUER });
  if (typeof payload.sub !== "string" || !payload.sub) throw new Error("Invalid session token");
  return {
    sub: payload.sub,
    roles: Array.isArray(payload.roles) ? (payload.roles as string[]) : [],
    permissions: Array.isArray(payload.permissions) ? (payload.permissions as string[]) : [],
    v: typeof payload.v === "number" ? payload.v : 0,
  };
}
