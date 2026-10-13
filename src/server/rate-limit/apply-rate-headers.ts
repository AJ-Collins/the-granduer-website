/** Merges X-RateLimit-* headers into an existing Response. */
export function applyRateHeaders(res: Response, headers: Record<string, string>): Response {
  const next = new Response(res.body, res);
  for (const [key, value] of Object.entries(headers)) next.headers.set(key, value);
  return next;
}
