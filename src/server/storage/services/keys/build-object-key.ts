import { randomUUID } from "node:crypto";
import { extensionForMime } from "./extension-for-mime";

/** Opaque keys (products/<uuid>.png) — no filename collisions or traversal. */
export function buildObjectKey(prefix: string, mimeType: string): string {
  const safe = prefix.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "uploads";
  return `${safe}/${randomUUID()}${extensionForMime(mimeType)}`;
}
