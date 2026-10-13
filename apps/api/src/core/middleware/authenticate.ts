import type { MiddlewareHandler } from "hono";
import { unauthorized } from "../errors/app-error.js";

export type AuthContext = {
  userId: string;
  roles: string[];
  permissions: string[];
};

/** Verifies a bearer token — implemented by identity/sessions, injected at bootstrap. */
export type SessionVerifier = (token: string) => Promise<AuthContext | null>;

/**
 * Factory (not a singleton): bootstrap closes over the real session verifier.
 * Public routes skip this middleware entirely; protected routes mount it first.
 */
export function makeAuthenticate(verify: SessionVerifier): MiddlewareHandler {
  return async (c, next) => {
    const header = c.req.header("authorization");
    if (!header?.startsWith("Bearer ")) throw unauthorized("Missing bearer token");
    const token = header.slice("Bearer ".length).trim();
    if (!token) throw unauthorized("Invalid token");
    const auth = await verify(token);
    if (!auth) throw unauthorized("Session expired or revoked");
    c.set("auth", auth);
    await next();
  };
}
