import { BarChart, ChartContainer, DonutChart } from "@/shared/components/management";
import type { getCmsDashboardStats } from "@/server/cms/services/get-cms-dashboard-stats";

type Data = Awaited<ReturnType<typeof getCmsDashboardStats>>;

export function CmsDashboardCharts({ data }: { data: Data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <ChartContainer
        title="Package Tier Composition"
        description="Catalogue distribution across Essential, Classic, Signature, and Bespoke offerings."
        badge={data.isSampleData ? "Demo Catalogue" : "Live Catalogue"}
        badgeVariant={data.isSampleData ? "warning" : "success"}
      >
        <DonutChart data={data.tierBreakdown} centerLabel="Tiers" />
      </ChartContainer>
      <ChartContainer
        title="Catalogue Inventory Distribution"
        description="Overview of published editorial content, gallery assets, and client testimonials."
      >
        <BarChart data={data.catalogueDistribution} valueLabel="items" />
      </ChartContainer>
    </div>
  );
}
