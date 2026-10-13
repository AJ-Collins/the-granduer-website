/** "/admin/x" -> "/x", "/admin" -> "/", otherwise null. */
export function stripPrefix(pathname: string, prefix: string): string | null {
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return null;
}
