function trustedProxies(): string[] {
  return (process.env.TRUSTED_PROXIES ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Proxy headers are honored only with TRUSTED_PROXIES, else buckets to "unknown". */
export function clientIp(req: Request): string {
  const trusted = trustedProxies();
  if (trusted.length > 0) {
    const forwarded = req.headers.get("x-forwarded-for");
    const first = forwarded?.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}
