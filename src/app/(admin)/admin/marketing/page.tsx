import { PageHeader, StatCard } from "@/shared/components/management";
import { IconActivity, IconUsers } from "@/shared/components/management/icons";
import { FunnelChart, MarketingFilters, SourceBreakdownTable } from "@/domains/admin/marketing";
import { getFunnelSummary } from "@/server/analytics/services/get-funnel-summary";
import { getSourceBreakdown } from "@/server/analytics/services/get-source-breakdown";
import { MOCK_FUNNEL, MOCK_SOURCES } from "@/server/analytics/services/mock-analytics-events";

export default async function MarketingPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const active = view === "sources" ? "sources" : "overview";
  const [funnel, sources] = await Promise.all([getFunnelSummary(), getSourceBreakdown()]);
  const isMock = funnel.every((s) => s.count === 0) && sources.length === 0;
  const steps = isMock ? MOCK_FUNNEL : funnel;
  const rows = isMock ? MOCK_SOURCES : sources;
  const totalEvents = steps
    .filter((s) => s.event !== "opportunity")
    .reduce((sum, s) => sum + s.count, 0);
  const opportunities = steps.find((s) => s.event === "opportunity")?.count ?? 0;

  return (
    <>
      <PageHeader
        title="Marketing"
        description="Conversion funnel performance and lead-source breakdown."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Marketing" },
        ]}
      />

      <MarketingFilters active={active} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatCard label="Tracked events" value={totalEvents} icon={<IconActivity />} trend={isMock ? "Demo data" : "Live data"} />
        <StatCard label="Opportunities" value={opportunities} icon={<IconUsers />} trend="Pipeline total" href="/admin/opportunities" />
      </div>

      {active === "sources" ? (
        <SourceBreakdownTable rows={rows} />
      ) : (
        <div className="space-y-6">
          <FunnelChart steps={steps} isMock={isMock} />
          <SourceBreakdownTable rows={rows} />
        </div>
      )}
    </>
  );
}
