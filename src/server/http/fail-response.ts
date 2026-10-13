import type { ApiFailure } from "./api-response";

export function fail(
  code: string,
  message: string,
  init?: { status?: number; retryAfterSeconds?: number; details?: unknown },
): Response {
  const headers: Record<string, string> = {};
  if (init?.retryAfterSeconds !== undefined) {
    headers["Retry-After"] = String(init.retryAfterSeconds);
  }
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(init?.retryAfterSeconds !== undefined && {
          retryAfterSeconds: init.retryAfterSeconds,
        }),
        ...(init?.details !== undefined && { details: init.details }),
      },
    } satisfies ApiFailure,
    { status: init?.status ?? 400, headers },
  );
}
