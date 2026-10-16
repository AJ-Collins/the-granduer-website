import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconPlus } from "@/shared/components/management/icons";
import { OpportunitiesBoard } from "@/domains/admin/opportunities";
import { listOpportunities } from "@/server/enquiries/services/opportunities/list-opportunities";

export default async function OpportunitiesPage() {
  const { items } = await listOpportunities(1, 100);

  return (
    <>
      <PageHeader
        title="Opportunities"
        description="Qualified submissions tracked through the sales pipeline, ENQUIRE to REVIEW."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Opportunities" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/submissions">
            <IconPlus size={16} />
            Submissions
          </MgmtButton>
        }
      />
      <OpportunitiesBoard opportunities={items} />
    </>
  );
}
