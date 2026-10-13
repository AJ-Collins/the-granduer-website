export class TooManyResetRequestsError extends Error {
  readonly status = 429;
  readonly retryAfterSeconds = 3600;
  constructor() {
    super("Too many reset requests — try again later");
    this.name = "TooManyResetRequestsError";
  }
}
