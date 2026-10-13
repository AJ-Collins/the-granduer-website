import { randomBytes } from "node:crypto";

/** Opaque 256-bit refresh token. Only its SHA-256 hash is ever stored. */
export function generateRefreshToken(): string {
  return randomBytes(32).toString("hex");
}
