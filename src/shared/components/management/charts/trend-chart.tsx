"use client";

import { useState, useRef, useId } from "react";
import type { TimeSeriesPoint } from "@/shared/types/analytics";
import { TREND_WIDTH, buildTrendPoints, smoothLinePath, trendYMax, trendYTicks } from "./trend-scales";
import { TrendTooltip } from "./trend-tooltip";

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

  const yMax = trendYMax(data);
  const width = TREND_WIDTH;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = buildTrendPoints(data, height, yMax, chartWidth, chartHeight, paddingLeft, paddingTop);
  const linePath = smoothLinePath(points, (p) => p.y);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
  const hasSecondary = points.some((p) => p.y2 !== null);
  const secondaryLinePath = hasSecondary ? smoothLinePath(points, (p) => p.y2 ?? p.y) : "";

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
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

  const yTicks = trendYTicks(yMax, paddingTop, chartHeight);
  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative w-full">
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

      <div className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-mgmt-accent)" stopOpacity="0.3" />
              <stop offset="90%" stopColor="var(--color-mgmt-accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

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

          <path d={areaPath} fill={`url(#${gradientId})`} />

          {hasSecondary && (
            <path d={secondaryLinePath} fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" />
          )}

          <path
            d={linePath}
            fill="none"
            stroke="var(--color-mgmt-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

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
              {activePoint.y2 !== null && (
                <circle cx={activePoint.x} cy={activePoint.y2} r={4} fill="#3b82f6" stroke="var(--color-mgmt-surface)" strokeWidth={2} />
              )}
              <circle cx={activePoint.x} cy={activePoint.y} r={5.5} fill="var(--color-mgmt-accent)" stroke="var(--color-mgmt-surface)" strokeWidth={2.5} />
            </g>
          )}
        </svg>

        {activePoint && (
          <TrendTooltip point={activePoint} width={width} height={height} primaryLabel={primaryLabel} secondaryLabel={secondaryLabel} />
        )}
      </div>
    </div>
  );
}
