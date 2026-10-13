export class StaleRefreshTokenError extends Error {
  constructor() {
    super("Session expired");
    this.name = "StaleRefreshTokenError";
  }
}
