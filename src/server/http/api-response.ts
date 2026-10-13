export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: { page: number; pageSize: number; total: number; totalPages: number };
};

export type ApiFailure = {
  success: false;
  error: { code: string; message: string; retryAfterSeconds?: number; details?: unknown };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export function ok<T>(data: T, init?: { status?: number }): Response {
  return Response.json({ success: true, data } satisfies ApiSuccess<T>, {
    status: init?.status ?? 200,
  });
}

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
