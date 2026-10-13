export class InvalidUploadFormError extends Error {
  readonly status = 400;
  constructor() {
    super("Expected multipart form with a file field");
    this.name = "InvalidUploadFormError";
  }
}
