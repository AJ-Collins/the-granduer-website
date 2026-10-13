export const OUTBOX_MAX_ATTEMPTS = 3;
const STUCK_SENDING_MINUTES = 5;

/** Minutes to wait before attempt N+1 (attempts counts completed tries). */
export function backoffMinutes(attempts: number): number {
  return 2 ** attempts;
}

export function nextAttemptAt(attempts: number, from = new Date()): Date {
  return new Date(from.getTime() + backoffMinutes(attempts) * 60_000);
}

/** True while more tries remain (attempts counts completed tries). */
export function mayRetry(attempts: number): boolean {
  return attempts < OUTBOX_MAX_ATTEMPTS;
}

export function stuckSendingBefore(from = new Date()): Date {
  return new Date(from.getTime() - STUCK_SENDING_MINUTES * 60_000);
}
