export class KeyInProgressError extends Error {
  readonly status = 409;
  readonly retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super("An identical request with this idempotency key is already being processed");
    this.name = "KeyInProgressError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
