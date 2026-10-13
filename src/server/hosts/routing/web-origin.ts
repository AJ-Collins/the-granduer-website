/** Site origin for the storefront surface (used by admin/cms chrome links). */
export function webOrigin(): string {
  const proto = "http";
  const hosts = (process.env.WEB_HOSTS ?? "").split(",")[0]?.trim();
  return `${proto}://${hosts || "localhost:3000"}`;
}
