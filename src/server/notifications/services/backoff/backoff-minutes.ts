/** Minutes to wait before attempt N+1 (attempts counts completed tries). */
export function backoffMinutes(attempts: number): number {
  return 2 ** attempts;
}
