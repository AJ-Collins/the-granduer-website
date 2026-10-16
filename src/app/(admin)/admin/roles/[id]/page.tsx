import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { RoleDetailView } from "@/domains/admin/roles";

export default async function RoleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="Role Details"
        description="View the permissions granted by this role."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Roles", href: "/admin/roles" },
          { label: "Role Details" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/roles">
            <IconArrowLeft size={16} />
            Back to Roles
          </MgmtButton>
        }
      />
      <RoleDetailView roleId={id} />
    </>
  );
}
