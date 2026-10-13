import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function ok<T>(c: Context, data: T, status: ContentfulStatusCode = 200) {
  return c.json({ ok: true, data }, status);
}

export function created<T>(c: Context, data: T) {
  return c.json({ ok: true, data }, 201);
}

export function paginated<T>(c: Context, items: T[], page: number, pageSize: number, total: number) {
  return c.json(
    {
      ok: true,
      data: items,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    },
    200,
  );
}
