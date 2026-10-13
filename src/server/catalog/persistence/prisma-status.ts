import type { PublishState } from "./rows";

export function prismaStatus(s: PublishState): "DRAFT" | "PUBLISHED" | "ARCHIVED" {
  return s.toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED";
}
