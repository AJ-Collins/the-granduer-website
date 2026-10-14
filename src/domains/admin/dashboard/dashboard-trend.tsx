import { ChartContainer, TrendChart } from "@/shared/components/management";
import type { getDashboardAnalytics } from "@/server/admin/services/get-dashboard-analytics";

type Analytics = Awaited<ReturnType<typeof getDashboardAnalytics>>;

export function DashboardTrend({ analytics }: { analytics: Analytics }) {
  return (
    <div className="mb-8">
      <ChartContainer
        title="Enquiries &amp; Booking Trajectory"
        description="Monthly volume of client enquiries and confirmed bookings over the past 6 months."
        badge={analytics.isSampleData ? "Demo Analytics" : "Live Metrics"}
        badgeVariant={analytics.isSampleData ? "warning" : "success"}
        footer={
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>Showing aggregated data updated in real-time.</span>
            <span className="text-[11px] font-mono">Trajectory: +38.2% Growth</span>
          </div>
        }
      >
        <TrendChart
          data={analytics.enquiriesTrend}
          primaryLabel="Total Enquiries"
          secondaryLabel="Confirmed Bookings"
          height={240}
        />
      </ChartContainer>
    </div>
  );
}
