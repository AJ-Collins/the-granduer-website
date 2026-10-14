import { CmsDashboardActions, CmsDashboardCharts, CmsDashboardKpis } from "@/domains/cms/dashboard";
import { PageHeader } from "@/shared/components/management";
import { getCmsDashboardStats } from "@/server/cms/services/get-cms-dashboard-stats";

export default async function CmsDashboardPage() {
  const data = await getCmsDashboardStats();

  return (
    <>
      <PageHeader
        title="CMS Studio Dashboard"
        description="Manage venue catalogue, editorial packages, customer testimonials, and media galleries."
        breadcrumbs={[
          { label: "CMS Studio", href: "/dashboard" },
          { label: "Dashboard" },
        ]}
      />
      <CmsDashboardKpis data={data} />
      <CmsDashboardCharts data={data} />
      <CmsDashboardActions />
    </>
  );
}
