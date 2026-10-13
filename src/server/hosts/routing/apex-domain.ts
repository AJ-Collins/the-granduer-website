export function apexDomain(): string {
  return (process.env.APEX_DOMAIN ?? "localhost").toLowerCase();
}
