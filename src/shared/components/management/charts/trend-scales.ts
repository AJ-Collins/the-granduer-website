import type { TimeSeriesPoint } from "@/shared/types/analytics";

export const TREND_WIDTH = 600;

export function buildTrendPoints(
  data: TimeSeriesPoint[],
  height: number,
  yMax: number,
  chartWidth: number,
  chartHeight: number,
  paddingLeft: number,
  paddingTop: number,
) {
  return data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / yMax) * chartHeight;
    const y2 =
      d.secondaryValue != null
        ? paddingTop + chartHeight - (d.secondaryValue / yMax) * chartHeight
        : null;
    return { x, y, y2, data: d };
  });
}

export type TrendPoint = ReturnType<typeof buildTrendPoints>[number];

export function smoothLinePath(points: TrendPoint[], pick: (p: TrendPoint) => number) {
  return points.reduce((acc, curr, idx, arr) => {
    const currY = pick(curr);
    if (idx === 0) return `M ${curr.x} ${currY}`;
    const prev = arr[idx - 1];
    const prevY = pick(prev);
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpX2 = curr.x - (curr.x - prev.x) / 2;
    return `${acc} C ${cpX1} ${prevY}, ${cpX2} ${currY}, ${curr.x} ${currY}`;
  }, "");
}

export function trendYMax(data: TimeSeriesPoint[]) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.secondaryValue ?? 0)), 10);
  return Math.ceil(maxValue * 1.15);
}

export function trendYTicks(yMax: number, paddingTop: number, chartHeight: number) {
  return [0, 0.33, 0.66, 1].map((pct) => ({
    val: Math.round(yMax * pct),
    yPos: paddingTop + chartHeight - pct * chartHeight,
  }));
}
