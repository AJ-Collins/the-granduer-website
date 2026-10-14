import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, StatusBadge } from "@/shared/components/management";

export type AdminUserRow = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  roles: string[];
};

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active": return "success" as const;
    case "suspended": case "banned": return "danger" as const;
    case "pending": return "warning" as const;
    default: return "default" as const;
  }
}

export function UsersTable({ users }: { users: AdminUserRow[] }) {
  return (
    <DataTable>
      <DataTableHead>
        <tr>
          <DataTableHeaderCell>Name</DataTableHeaderCell>
          <DataTableHeaderCell>Email</DataTableHeaderCell>
          <DataTableHeaderCell>Status</DataTableHeaderCell>
          <DataTableHeaderCell>Roles</DataTableHeaderCell>
          <DataTableHeaderCell className="hidden sm:table-cell">Actions</DataTableHeaderCell>
        </tr>
      </DataTableHead>
      <tbody>
        {users.map((u) => (
          <DataTableRow key={u.id}>
            <DataTableCell>
              <a
                href={`/admin/users/${u.id}`}
                className="font-medium text-[var(--color-mgmt-text)] hover:text-[var(--color-mgmt-accent)] transition-colors"
              >
                {u.name ?? "—"}
              </a>
            </DataTableCell>
            <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">
              {u.email}
            </DataTableCell>
            <DataTableCell>
              <StatusBadge variant={statusVariant(u.status)}>{u.status}</StatusBadge>
            </DataTableCell>
            <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">
              <div className="flex flex-wrap gap-1">
                {u.roles.map((role) => (
                  <StatusBadge key={role} variant="info">{role}</StatusBadge>
                ))}
              </div>
            </DataTableCell>
            <DataTableCell className="hidden sm:table-cell">
              <a
                href={`/admin/users/${u.id}/edit`}
                className="text-xs text-[var(--color-mgmt-accent)] hover:underline"
              >
                Edit
              </a>
            </DataTableCell>
          </DataTableRow>
        ))}
      </tbody>
    </DataTable>
  );
}
