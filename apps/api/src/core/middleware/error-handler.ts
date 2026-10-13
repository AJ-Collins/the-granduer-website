import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { AppError } from "../errors/app-error.js";
import { logger } from "../logging/logger.js";

export const errorHandler: ErrorHandler = (err, c) => {
  const requestId =
    (c.get as (k: string) => unknown)("requestId") ??
    c.req.header("x-request-id") ??
    "unknown";
  if (err instanceof AppError) {
    return c.json(
      { ok: false, error: { code: err.code, message: err.message }, requestId },
      err.statusCode as ContentfulStatusCode,
    );
  }
  if (err instanceof HTTPException) {
    return c.json(
      { ok: false, error: { code: "HTTP_ERROR", message: err.message }, requestId },
      err.status,
    );
  }
  logger.error("Unhandled error", { requestId, err });
  return c.json(
    { ok: false, error: { code: "INTERNAL_ERROR", message: "Internal server error" }, requestId },
    500,
  );
};
