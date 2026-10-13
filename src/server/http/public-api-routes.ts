/** Routes servable without a session (handled per-method). */
const PUBLIC_GET = new Set([
  "/api/enquiry",
  "/api/packages",
  "/api/events",
  "/api/faqs",
  "/api/testimonials",
  "/api/gallery",
  "/api/content",
]);

const PUBLIC_POST = new Set([
  "/api/enquiry",
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/password-request",
  "/api/auth/password-reset",
]);

export function isPublicApi(pathname: string, method: string): boolean {
  if (method === "GET") {
    if (PUBLIC_GET.has(pathname)) return true;
    // Public detail reads: /api/packages/<slug>, /api/files/<key>
    if (
      pathname.startsWith("/api/packages/") ||
      pathname.startsWith("/api/events/") ||
      pathname.startsWith("/api/files/")
    ) {
      return true;
    }
    return false;
  }
  return PUBLIC_POST.has(pathname);
}
