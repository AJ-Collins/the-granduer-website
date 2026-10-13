/** Absolute login URL for emails/links (same-host login pages). */
export function absoluteLoginUrl(host: string, callbackUrl = "/"): string {
  const proto = host.includes("localhost") ? "http" : "https";
  return `${proto}://${host}/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
