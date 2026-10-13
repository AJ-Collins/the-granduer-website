import { backoffMinutes } from "./backoff-minutes";

export function nextAttemptAt(attempts: number, from = new Date()): Date {
  return new Date(from.getTime() + backoffMinutes(attempts) * 60_000);
}
