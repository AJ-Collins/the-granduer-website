import { apexDomain } from "./apex-domain";

/** Apex host for the current environment, preserving localhost dev ports. */
export function apexHostFor(hostHeader: string): string {
  const port = hostHeader.split(":")[1];
  const apex = apexDomain();
  if (apex === "localhost" && port) return `localhost:${port}`;
  return apex;
}
