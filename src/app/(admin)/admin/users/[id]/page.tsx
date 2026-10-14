import { PageHeader, SectionCard, EmptyState } from "@/shared/components/management";
import { IconUsers } from "@/shared/components/management/icons";

export default function UserDetailsPage() {
  return (
    <>
      <PageHeader
        title="User Details"
        description="View and manage this user's account information."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
          { label: "User Details" },
        ]}
      />

      <SectionCard title="Account Information">
        <EmptyState
          icon={<IconUsers />}
          title="User details"
          description="Detailed user profile information will be displayed here."
        />
      </SectionCard>
    </>
  );
}
