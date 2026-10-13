import { OUTBOX_MAX_ATTEMPTS } from "./outbox-policy";

/** True while more tries remain (attempts counts completed tries). */
export function mayRetry(attempts: number): boolean {
  return attempts < OUTBOX_MAX_ATTEMPTS;
}
