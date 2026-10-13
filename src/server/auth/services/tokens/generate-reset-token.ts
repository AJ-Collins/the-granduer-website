import { randomBytes } from "node:crypto";

export function generateResetToken(): string {
  return randomBytes(32).toString("hex");
}
