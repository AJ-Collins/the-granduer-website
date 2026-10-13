import { createHash, randomBytes } from "node:crypto";

/**
 * Opaque password-reset tokens. Only the SHA-256 hash is persisted;
 * the raw token is emailed to the user once and never stored.
 */
export type ResetToken = {
  /** Send this to the user (single use). */
  token: string;
  /** Persist this. */
  hash: string;
  expiresAt: Date;
};

export function createResetToken(ttlMinutes = 60): ResetToken {
  const token = randomBytes(32).toString("hex");
  return {
    token,
    hash: hashResetToken(token),
    expiresAt: new Date(Date.now() + ttlMinutes * 60_000),
  };
}

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
