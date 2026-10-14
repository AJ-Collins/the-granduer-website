import { DashboardActionsStatus, DashboardBreakdowns, DashboardKpiGrid, DashboardRecentActivity, DashboardTrend } from "@/domains/admin/dashboard";
import { PageHeader } from "@/shared/components/management";
import { getDashboardAnalytics } from "@/server/admin/services/get-dashboard-analytics";
import { getDashboardStats } from "@/server/admin/services/get-dashboard-stats";

export default async function DashboardPage() {
  let stats: Awaited<ReturnType<typeof getDashboardStats>> | null = null;
  try {
    stats = await getDashboardStats();
  } catch {
  }

  const analytics = await getDashboardAnalytics();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Operational metrics, booking enquiries, and platform performance."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Dashboard" },
        ]}
      />
      <DashboardKpiGrid stats={stats} />
      <DashboardTrend analytics={analytics} />
      <DashboardBreakdowns analytics={analytics} />
      <DashboardActionsStatus />
      <DashboardRecentActivity analytics={analytics} />
    </>
  );
}
