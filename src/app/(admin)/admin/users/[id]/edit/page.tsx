import { PageHeader, SectionCard, EmptyState } from "@/shared/components/management";
import { IconUsers } from "@/shared/components/management/icons";

export default function EditUserPage() {
  return (
    <>
      <PageHeader
        title="Edit User"
        description="Update this user's profile, roles, and account status."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
          { label: "Edit User" },
        ]}
      />

      <SectionCard title="Edit Account">
        <EmptyState
          icon={<IconUsers />}
          title="Edit form"
          description="The user edit form will be available here."
        />
      </SectionCard>
    </>
  );
}
