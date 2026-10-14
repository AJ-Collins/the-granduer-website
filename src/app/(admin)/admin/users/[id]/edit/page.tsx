import { cookies } from "next/headers";
import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { UserEditForm } from "@/domains/admin/users";
import { getSessionUserFromCookies } from "@/server/auth/services/sessions/get-session-user-from-cookies";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSessionUserFromCookies(await cookies());
  const currentUserId = session?.id ?? "";

  return (
    <>
      <PageHeader
        title="Edit User"
        description="Update this user's roles and account status."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
          { label: "User Details", href: `/admin/users/${id}` },
          { label: "Edit" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href={`/admin/users/${id}`}>
            <IconArrowLeft size={16} />
            Back to Profile
          </MgmtButton>
        }
      />
      <UserEditForm userId={id} currentUserId={currentUserId} />
    </>
  );
}
