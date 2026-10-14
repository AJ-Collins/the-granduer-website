import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { UserForm } from "@/domains/admin/users";

export default function NewUserPage() {
  return (
    <>
      <PageHeader
        title="Create User"
        description="Add a new user account with login credentials and role assignments."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
          { label: "Create User" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/users">
            <IconArrowLeft size={16} />
            Back
          </MgmtButton>
        }
      />
      <UserForm />
    </>
  );
}
