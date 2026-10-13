/** Host header without port, lowercased. */
export function hostOf(hostHeader: string): string {
  return hostHeader.split(",")[0]?.split(":")[0]?.trim().toLowerCase() ?? "";
}
