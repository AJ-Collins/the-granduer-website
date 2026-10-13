import { jwtVerify } from "jose";
import type { AccessClaims } from "./session-claims";

export async function verifySessionToken(token: string, secret: string): Promise<AccessClaims> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, { issuer: "dgrandeur" });
  if (typeof payload.sub !== "string" || typeof payload.sid !== "string") {
    throw new Error("Invalid session token");
  }
  return {
    sub: payload.sub,
    sid: payload.sid,
    roles: Array.isArray(payload.roles) ? (payload.roles as string[]) : [],
    permissions: Array.isArray(payload.permissions) ? (payload.permissions as string[]) : [],
  };
}
