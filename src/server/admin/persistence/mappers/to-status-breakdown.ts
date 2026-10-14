export function toStatusBreakdown(
  statusCounts: { status: string; count: number }[],
  total: number,
) {
  return statusCounts.map((s) => {
    const pct = Math.round((s.count / total) * 100);
    let color = "#3ecf8e";
    if (s.status === "ASSIGNED") color = "#3b82f6";
    if (s.status === "CONTACTED") color = "#f59e0b";
    if (s.status === "CLOSED") color = "#a1a1a1";
    return { id: s.status.toLowerCase(), label: s.status, value: s.count, percentage: pct, color };
  });
}
