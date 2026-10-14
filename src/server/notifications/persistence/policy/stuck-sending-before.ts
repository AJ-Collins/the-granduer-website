const STUCK_SENDING_MINUTES = 5;

export function stuckSendingBefore(from = new Date()): Date {
  return new Date(from.getTime() - STUCK_SENDING_MINUTES * 60_000);
}
