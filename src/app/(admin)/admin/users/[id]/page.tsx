import { cookies } from "next/headers";
import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { UserProfileView } from "@/domains/admin/users";
import { getSessionUserFromCookies } from "@/server/auth/services/sessions/get-session-user-from-cookies";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSessionUserFromCookies(await cookies());
  const currentUserId = session?.id ?? "";

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
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/users">
            <IconArrowLeft size={16} />
            Back to Users
          </MgmtButton>
        }
      />
      <UserProfileView userId={id} currentUserId={currentUserId} />
    </>
  );
}
