"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import type { CategoryBreakdownItem } from "@/shared/types/analytics";

type DonutChartProps = {
  data: CategoryBreakdownItem[];
  centerLabel?: string;
};

const DEFAULT_COLORS = ["#3ecf8e", "#3b82f6", "#f59e0b", "#a1a1a1", "#8b5cf6", "#ec4899"];

export function DonutChart({ data, centerLabel = "Total" }: DonutChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-[var(--color-mgmt-text-muted)]">
        No breakdown data available
      </div>
    );
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Geometry
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate arc offsets
  let accumulated = 0;
  const segments = data.map((item, idx) => {
    const ratio = totalValue > 0 ? item.value / totalValue : 0;
    const strokeDasharray = `${ratio * circumference} ${circumference}`;
    const strokeDashoffset = -(accumulated * circumference);
    accumulated += ratio;
    const color = item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    const percentage = item.percentage ?? Math.round(ratio * 100);

    return {
      ...item,
      color,
      strokeDasharray,
      strokeDashoffset,
      percentage,
    };
  });

  const activeSegment = hoveredId ? segments.find((s) => s.id === hoveredId) : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
      {/* SVG Donut */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg] select-none"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-mgmt-border-subtle)"
            strokeWidth={strokeWidth}
          />

          {/* Segment Arcs */}
          {segments.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <circle
                key={seg.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-200 cursor-pointer origin-center"
                style={{
                  opacity: hoveredId && !isHovered ? 0.45 : 1,
                  filter: isHovered ? "drop-shadow(0 0 6px rgba(0,0,0,0.3))" : undefined,
                }}
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-[var(--color-mgmt-text)] leading-none">
            {activeSegment ? activeSegment.value : totalValue}
          </span>
          <span className="text-[11px] font-medium text-[var(--color-mgmt-text-muted)] truncate max-w-[90px] mt-1">
            {activeSegment ? activeSegment.label : centerLabel}
          </span>
          {activeSegment && (
            <span className="text-[10px] text-[var(--color-mgmt-accent)] font-semibold mt-0.5">
              {activeSegment.percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Legend List */}
      <div className="w-full sm:w-auto flex-1 max-w-xs space-y-2">
        {segments.map((seg) => {
          const isHovered = hoveredId === seg.id;
          return (
            <button
              key={seg.id}
              type="button"
              className={cn(
                "w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                isHovered
                  ? "bg-[var(--color-mgmt-surface-hover)]"
                  : "hover:bg-[var(--color-mgmt-surface-hover)]/60",
              )}
              onMouseEnter={() => setHoveredId(seg.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span
                  className={cn(
                    "truncate transition-colors",
                    isHovered
                      ? "text-[var(--color-mgmt-text)] font-semibold"
                      : "text-[var(--color-mgmt-text-secondary)]",
                  )}
                >
                  {seg.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-[var(--color-mgmt-text-muted)] text-[11px]">
                <span className="text-[var(--color-mgmt-text)] font-medium">{seg.value}</span>
                <span>({seg.percentage}%)</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
