"use client";

import { useState, useRef, useId } from "react";
import type { TimeSeriesPoint } from "@/shared/types/analytics";

type TrendChartProps = {
  data: TimeSeriesPoint[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: number;
};

export function TrendChart({
  data,
  primaryLabel = "Enquiries",
  secondaryLabel = "Bookings",
  height = 220,
}: TrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-[var(--color-mgmt-text-muted)]">
        No trend data available
      </div>
    );
  }

  // Calculate scales
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.value, d.secondaryValue ?? 0)),
    10,
  );
  // Round up max value to nice round step
  const yMax = Math.ceil(maxValue * 1.15);

  const width = 600;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / yMax) * chartHeight;
    const y2 = d.secondaryValue != null
      ? paddingTop + chartHeight - (d.secondaryValue / yMax) * chartHeight
      : null;
    return { x, y, y2, data: d };
  });

  // Construct smooth SVG path (Catmull-Rom or cubic bezier)
  const linePath = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpX2 = curr.x - (curr.x - prev.x) / 2;
    return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  // Area path (closed at the bottom)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  // Secondary line path if available
  const hasSecondary = points.some((p) => p.y2 !== null);
  const secondaryLinePath = hasSecondary
    ? points.reduce((acc, curr, idx, arr) => {
        const currY = curr.y2 ?? curr.y;
        if (idx === 0) return `M ${curr.x} ${currY}`;
        const prev = arr[idx - 1];
        const prevY = prev.y2 ?? prev.y;
        const cpX1 = prev.x + (curr.x - prev.x) / 2;
        const cpX2 = curr.x - (curr.x - prev.x) / 2;
        return `${acc} C ${cpX1} ${prevY}, ${cpX2} ${currY}, ${curr.x} ${currY}`;
      }, "")
    : "";

  // Pointer interactions
  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    // Find nearest point
    let closestIndex = 0;
    let minDistance = Infinity;
    points.forEach((p, idx) => {
      const dist = Math.abs(p.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoverIndex(closestIndex);
  }

  function handlePointerLeave() {
    setHoverIndex(null);
  }

  // Y-axis grid marks (4 levels)
  const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = Math.round(yMax * pct);
    const yPos = paddingTop + chartHeight - pct * chartHeight;
    return { val, yPos };
  });

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="flex items-center justify-end gap-4 mb-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-mgmt-accent)]" />
          <span className="text-[var(--color-mgmt-text)] font-medium">{primaryLabel}</span>
        </div>
        {hasSecondary && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[var(--color-mgmt-text-secondary)]">{secondaryLabel}</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-mgmt-accent)" stopOpacity="0.3" />
              <stop offset="90%" stopColor="var(--color-mgmt-accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={tick.yPos}
                x2={width - paddingRight}
                y2={tick.yPos}
                stroke="var(--color-mgmt-border-subtle)"
                strokeDasharray={i === 0 ? undefined : "3 3"}
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 8}
                y={tick.yPos + 3}
                fill="var(--color-mgmt-text-muted)"
                fontSize="10"
                textAnchor="end"
                className="font-mono"
              >
                {tick.val}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Secondary Line */}
          {hasSecondary && (
            <path
              d={secondaryLinePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          )}

          {/* Primary Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-mgmt-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 6}
              fill={hoverIndex === idx ? "var(--color-mgmt-text)" : "var(--color-mgmt-text-muted)"}
              fontSize="11"
              fontWeight={hoverIndex === idx ? "600" : "400"}
              textAnchor="middle"
              className="transition-colors"
            >
              {p.data.label}
            </text>
          ))}

          {/* Hover Crosshair & Highlights */}
          {activePoint && (
            <g className="transition-all duration-150">
              <line
                x1={activePoint.x}
                y1={paddingTop}
                x2={activePoint.x}
                y2={paddingTop + chartHeight}
                stroke="var(--color-mgmt-text-muted)"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              {/* Secondary point dot */}
              {activePoint.y2 !== null && (
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y2}
                  r={4}
                  fill="#3b82f6"
                  stroke="var(--color-mgmt-surface)"
                  strokeWidth={2}
                />
              )}
              {/* Primary point dot */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r={5.5}
                fill="var(--color-mgmt-accent)"
                stroke="var(--color-mgmt-surface)"
                strokeWidth={2.5}
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Card */}
        {activePoint && (
          <div
            className="absolute pointer-events-none z-20 transition-all duration-75"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${Math.max(0, (activePoint.y / height) * 100 - 35)}%`,
              transform: `translate(${activePoint.x > width * 0.7 ? "-105%" : "8px"}, -50%)`,
            }}
          >
            <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-lg shadow-lg px-2.5 py-1.5 text-xs min-w-[110px] space-y-1">
              <div className="font-semibold text-[var(--color-mgmt-text)] border-b border-[var(--color-mgmt-border-subtle)] pb-1 mb-1">
                {activePoint.data.label}
              </div>
              <div className="flex items-center justify-between gap-3 text-[var(--color-mgmt-accent)] font-medium">
                <span>{primaryLabel}:</span>
                <span className="font-mono text-[13px]">{activePoint.data.value}</span>
              </div>
              {activePoint.data.secondaryValue != null && (
                <div className="flex items-center justify-between gap-3 text-blue-500 font-medium">
                  <span>{secondaryLabel}:</span>
                  <span className="font-mono text-[13px]">{activePoint.data.secondaryValue}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
