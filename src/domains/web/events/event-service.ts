export type Service = string | { title?: string; name?: string; label?: string };

export function labelOf(s: Service) {
  return typeof s === "string" ? s : (s.title ?? s.name ?? s.label ?? "");
}
