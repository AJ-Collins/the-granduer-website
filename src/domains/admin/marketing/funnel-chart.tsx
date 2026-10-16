"use client";

import { BarChart, ChartContainer } from "@/shared/components/management";
import type { FunnelStep } from "@/server/analytics/services/get-funnel-summary";

export function FunnelChart({ steps, isMock }: { steps: FunnelStep[]; isMock: boolean }) {
  const max = Math.max(1, ...steps.map((s) => s.count));
  return (
    <ChartContainer
      title="Conversion Funnel"
      description="From page views to qualified opportunities."
      badge={isMock ? "Demo data" : "Live data"}
      badgeVariant={isMock ? "warning" : "success"}
    >
      <BarChart
        data={steps.map((s) => ({
          id: s.event,
          label: s.label,
          value: s.count,
          formattedValue: `${s.count} · ${Math.round((s.count / max) * 100)}%`,
        }))}
        valueLabel="events"
      />
    </ChartContainer>
  );
}
