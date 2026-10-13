import type { Account } from "./account.js";

/** Full record including secrets — only the repository and use-cases see this. */
export interface AccountRecord extends Account {
  passwordHash: string;
  tokenVersion: number;
}

export interface AccountRepository {
  findByEmail(email: string): Promise<AccountRecord | null>;
  findById(id: string): Promise<AccountRecord | null>;
  /** Revokes all issued tokens by bumping the version. Returns the new version. */
  bumpTokenVersion(id: string): Promise<number>;
  setPassword(id: string, passwordHash: string): Promise<void>;
  storeResetToken(id: string, resetTokenHash: string, resetExpiresAt: Date): Promise<void>;
  findByResetTokenHash(resetTokenHash: string): Promise<AccountRecord | null>;
  clearResetToken(id: string): Promise<void>;
}
