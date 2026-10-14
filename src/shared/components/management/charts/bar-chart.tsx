"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import type { BarChartItem } from "@/shared/types/analytics";

type BarChartProps = {
  data: BarChartItem[];
  valueLabel?: string;
};

export function BarChart({ data, valueLabel = "enquiries" }: BarChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-[var(--color-mgmt-text-muted)]">
        No comparative data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3.5 py-1">
      {data.map((item) => {
        const percentage = Math.round((item.value / maxValue) * 100);
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Header: Label and Value */}
            <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
              <div className="min-w-0">
                <span
                  className={cn(
                    "font-medium transition-colors truncate block",
                    isHovered
                      ? "text-[var(--color-mgmt-accent)] font-semibold"
                      : "text-[var(--color-mgmt-text)]",
                  )}
                >
                  {item.label}
                </span>
                {item.subLabel && (
                  <span className="text-[10px] text-[var(--color-mgmt-text-muted)] truncate block">
                    {item.subLabel}
                  </span>
                )}
              </div>
              <div className="text-right shrink-0 font-mono">
                <span className="text-[13px] font-semibold text-[var(--color-mgmt-text)]">
                  {item.value}
                </span>
                <span className="text-[11px] text-[var(--color-mgmt-text-muted)] ml-1">
                  {item.formattedValue ? "" : valueLabel}
                </span>
              </div>
            </div>

            {/* Bar Track & Fill */}
            <div className="w-full h-2.5 rounded-full bg-[var(--color-mgmt-border-subtle)] overflow-hidden p-0.5">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300 ease-out",
                  isHovered
                    ? "bg-gradient-to-r from-emerald-500 via-[var(--color-mgmt-accent)] to-teal-400"
                    : "bg-[var(--color-mgmt-accent)]",
                )}
                style={{ width: `${Math.max(percentage, 3)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
