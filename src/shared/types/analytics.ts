export type TimeSeriesPoint = {
  date: string;
  label: string;
  value: number;
  secondaryValue?: number;
};

export type CategoryBreakdownItem = {
  id: string;
  label: string;
  value: number;
  percentage?: number;
  color?: string;
};

export type BarChartItem = {
  id: string;
  label: string;
  value: number;
  formattedValue?: string;
  subLabel?: string;
};

export type RecentActivityItem = {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  status: "success" | "warning" | "info" | "neutral";
};

export type DashboardAnalyticsData = {
  isSampleData: boolean;
  enquiriesTrend: TimeSeriesPoint[];
  statusBreakdown: CategoryBreakdownItem[];
  eventTypesBreakdown: BarChartItem[];
  recentActivity: RecentActivityItem[];
};
