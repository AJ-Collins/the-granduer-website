import { BarChart, ChartContainer, DonutChart } from "@/shared/components/management";
import type { getDashboardAnalytics } from "@/server/admin/services/get-dashboard-analytics";

type Analytics = Awaited<ReturnType<typeof getDashboardAnalytics>>;

export function DashboardBreakdowns({ analytics }: { analytics: Analytics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <ChartContainer
        title="Pipeline Status Breakdown"
        description="Distribution of active enquiries across triage, assignment, and client contact stages."
      >
        <DonutChart data={analytics.statusBreakdown} centerLabel="Enquiries" />
      </ChartContainer>
      <ChartContainer
        title="Demand by Event Experience"
        description="Client request volume across bespoke wedding receptions, corporate galas, and banquets."
      >
        <BarChart data={analytics.eventTypesBreakdown} valueLabel="enquiries" />
      </ChartContainer>
    </div>
  );
}
