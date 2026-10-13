export class InvalidResetTokenError extends Error {
  readonly status = 400;
  constructor() {
    super("Reset token is invalid or expired");
    this.name = "InvalidResetTokenError";
  }
}
