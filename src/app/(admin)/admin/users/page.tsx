import { PageHeader, MgmtButton, EmptyState } from "@/shared/components/management";
import { IconUsers, IconPlus } from "@/shared/components/management/icons";
import { UsersTable } from "@/domains/admin/users-table";
import { listUsers } from "@/server/users/services/list-users";

export default async function UsersPage() {
  let users: Awaited<ReturnType<typeof listUsers>>["items"] = [];
  try {
    const result = await listUsers(1, 50);
    users = result.items;
  } catch {
    /* DB unavailable */
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage user accounts, roles, and access across the platform."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users" },
        ]}
        actions={
          <MgmtButton variant="primary" href="/admin/users/new">
            <IconPlus size={16} />
            Create User
          </MgmtButton>
        }
      />

      {users.length > 0 ? (
        <UsersTable users={users} />
      ) : (
        <EmptyState
          icon={<IconUsers />}
          title="No users found"
          description="Create your first user account to get started."
          action={
            <MgmtButton variant="primary" href="/admin/users/new">
              <IconPlus size={16} />
              Create User
            </MgmtButton>
          }
        />
      )}
    </>
  );
}
