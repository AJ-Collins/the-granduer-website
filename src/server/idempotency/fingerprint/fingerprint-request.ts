import { createHash } from "node:crypto";

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`);
  return `{${entries.join(",")}}`;
}

/**
 * Binds a key to one exact request: method + path + actor + body shape.
 * Same key + same fingerprint = safe retry. Same key + different
 * fingerprint = client bug, rejected with 409.
 */
export function fingerprintRequest(input: {
  method: string;
  path: string;
  actor: string;
  body: unknown;
}): string {
  const canonical = [input.method.toUpperCase(), input.path, input.actor, stableStringify(input.body)].join(
    "\n",
  );
  return createHash("sha256").update(canonical).digest("hex");
}
