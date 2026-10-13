export class InvalidCredentialsError extends Error {
  readonly status = 401;
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}
