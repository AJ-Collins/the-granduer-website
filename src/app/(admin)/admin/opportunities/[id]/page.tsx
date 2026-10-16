import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { OpportunityDetail } from "@/domains/admin/opportunities";

export default async function OpportunityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="Opportunity Details"
        description="Stage timeline with per-transition notes."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Opportunities", href: "/admin/opportunities" },
          { label: "Opportunity Details" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/opportunities">
            <IconArrowLeft size={16} />
            Back to Pipeline
          </MgmtButton>
        }
      />
      <OpportunityDetail opportunityId={id} />
    </>
  );
}
