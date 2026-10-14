import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, StatusBadge } from "@/shared/components/management";

export type AdminRoleRow = {
  id: string;
  key: string;
  label: string;
  permissions: string[];
};

export function RolesTable({ roles }: { roles: AdminRoleRow[] }) {
  return (
    <DataTable>
      <DataTableHead>
        <tr>
          <DataTableHeaderCell>Role</DataTableHeaderCell>
          <DataTableHeaderCell>Key</DataTableHeaderCell>
          <DataTableHeaderCell>Permissions</DataTableHeaderCell>
        </tr>
      </DataTableHead>
      <tbody>
        {roles.map((r) => (
          <DataTableRow key={r.id}>
            <DataTableCell>
              <a
                href={`/admin/roles/${r.id}`}
                className="font-medium text-[var(--color-mgmt-text)] hover:text-[var(--color-mgmt-accent)] transition-colors"
              >
                {r.label}
              </a>
            </DataTableCell>
            <DataTableCell>
              <code className="text-xs bg-[var(--color-mgmt-bg)] px-1.5 py-0.5 rounded text-[var(--color-mgmt-text-secondary)]">
                {r.key}
              </code>
            </DataTableCell>
            <DataTableCell>
              <div className="flex flex-wrap gap-1 max-w-sm">
                {r.permissions.slice(0, 5).map((p) => (
                  <StatusBadge key={p}>{p}</StatusBadge>
                ))}
                {r.permissions.length > 5 && (
                  <StatusBadge>+{r.permissions.length - 5} more</StatusBadge>
                )}
              </div>
            </DataTableCell>
          </DataTableRow>
        ))}
      </tbody>
    </DataTable>
  );
}
