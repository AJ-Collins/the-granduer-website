export class RefreshRejectedError extends Error {
  readonly status = 401;
  constructor(message = "Session expired") {
    super(message);
    this.name = "RefreshRejectedError";
  }
}
