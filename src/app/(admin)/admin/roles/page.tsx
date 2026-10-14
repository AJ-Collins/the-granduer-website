import { PageHeader, MgmtButton, EmptyState } from "@/shared/components/management";
import { IconShield } from "@/shared/components/management/icons";
import { RolesTable } from "@/domains/admin/roles";
import { listRoles } from "@/server/users/services/list-roles";

export default async function RolesPage() {
  let roles: Awaited<ReturnType<typeof listRoles>> = [];
  try {
    roles = await listRoles();
  } catch {
    /* DB unavailable */
  }

  return (
    <>
      <PageHeader
        title="Roles"
        description="Define roles and their associated permissions to control access."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Roles" },
        ]}
      />

      {roles.length > 0 ? (
        <RolesTable roles={roles} />
      ) : (
        <EmptyState
          icon={<IconShield />}
          title="No roles configured"
          description="Roles will appear here once they are created."
        />
      )}
    </>
  );
}
