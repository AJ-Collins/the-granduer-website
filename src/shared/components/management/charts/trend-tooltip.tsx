import type { TrendPoint } from "./trend-scales";

export function TrendTooltip({
  point,
  width,
  height,
  primaryLabel,
  secondaryLabel,
}: {
  point: TrendPoint;
  width: number;
  height: number;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div
      className="absolute pointer-events-none z-20 transition-all duration-75"
      style={{
        left: `${(point.x / width) * 100}%`,
        top: `${Math.max(0, (point.y / height) * 100 - 35)}%`,
        transform: `translate(${point.x > width * 0.7 ? "-105%" : "8px"}, -50%)`,
      }}
    >
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-lg shadow-lg px-2.5 py-1.5 text-xs min-w-[110px] space-y-1">
        <div className="font-semibold text-[var(--color-mgmt-text)] border-b border-[var(--color-mgmt-border-subtle)] pb-1 mb-1">
          {point.data.label}
        </div>
        <div className="flex items-center justify-between gap-3 text-[var(--color-mgmt-accent)] font-medium">
          <span>{primaryLabel}:</span>
          <span className="font-mono text-[13px]">{point.data.value}</span>
        </div>
        {point.data.secondaryValue != null && (
          <div className="flex items-center justify-between gap-3 text-blue-500 font-medium">
            <span>{secondaryLabel}:</span>
            <span className="font-mono text-[13px]">{point.data.secondaryValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
