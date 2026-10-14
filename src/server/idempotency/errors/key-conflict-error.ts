export class KeyConflictError extends Error {
  readonly status = 409;
  constructor() {
    super("Idempotency key was already used with a different request payload");
    this.name = "KeyConflictError";
  }
}
