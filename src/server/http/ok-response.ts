import type { ApiSuccess } from "./api-response";

export function ok<T>(data: T, init?: { status?: number }): Response {
  return Response.json({ success: true, data } satisfies ApiSuccess<T>, {
    status: init?.status ?? 200,
  });
}
