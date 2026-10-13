import { signSessionToken, verifySessionToken } from "@dgrandeur/auth";
import type { AuthContext } from "../../../core/middleware/authenticate.js";
import type { AccountRepository } from "../accounts/account.repository.js";

/**
 * Issues and verifies session tokens. Verification checks the tokenVersion
 * claim against the account's current version (Redis-cached, DB fallback) so
 * logout / password change / suspension revoke tokens within the cache TTL.
 */
export class SessionService {
  private versions = new Map<string, { v: number; active: boolean; expiresAt: number }>();

  constructor(
    private accounts: AccountRepository,
    private secret: string,
    private cacheTtlMs = 60_000,
    private tokenTtlSeconds = 12 * 3600,
  ) {}

  async issue(accountId: string, roles: string[], permissions: string[], v: number): Promise<string> {
    return signSessionToken({ sub: accountId, roles, permissions, v }, this.secret, this.tokenTtlSeconds);
  }

  async verify(token: string): Promise<AuthContext | null> {
    let claims;
    try {
      claims = await verifySessionToken(token, this.secret);
    } catch {
      return null;
    }
    const cached = this.versions.get(claims.sub);
    if (cached && cached.expiresAt > Date.now()) {
      if (!cached.active || cached.v !== claims.v) return null;
    } else {
      const account = await this.accounts.findById(claims.sub);
      if (!account || account.status !== "active" || account.tokenVersion !== claims.v) {
        this.versions.set(claims.sub, { v: claims.v, active: false, expiresAt: Date.now() + this.cacheTtlMs });
        return null;
      }
      this.versions.set(claims.sub, { v: account.tokenVersion, active: true, expiresAt: Date.now() + this.cacheTtlMs });
    }
    return { userId: claims.sub, roles: claims.roles, permissions: claims.permissions };
  }

  /** Drop cached state so the next verify() re-reads the database. */
  forget(accountId: string): void {
    this.versions.delete(accountId);
  }
}
