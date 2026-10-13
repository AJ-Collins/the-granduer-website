export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, "BAD_REQUEST", message, details);
export const unauthorized = (message = "Unauthorized") =>
  new AppError(401, "UNAUTHORIZED", message);
export const forbidden = (message = "Forbidden") =>
  new AppError(403, "FORBIDDEN", message);
export const notFound = (resource = "Resource") =>
  new AppError(404, "NOT_FOUND", `${resource} not found`);
export const conflict = (message: string) => new AppError(409, "CONFLICT", message);
export const unprocessable = (message: string, details?: unknown) =>
  new AppError(422, "UNPROCESSABLE", message, details);
