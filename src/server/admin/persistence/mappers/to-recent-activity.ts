export function toRecentActivity(
  recent: { id: string; name: string; status: string; createdAt: Date; kind: string }[],
) {
  return recent.map((e) => ({
    id: e.id,
    action: `Enquiry: ${e.kind}`,
    actor: e.name,
    target: `Status: ${e.status}`,
    timestamp: new Date(e.createdAt).toLocaleDateString(),
    status: (e.status === "NEW" ? "success" : "neutral") as "success" | "neutral",
  }));
}
