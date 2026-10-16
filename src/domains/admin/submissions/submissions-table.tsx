import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, StatusBadge } from "@/shared/components/management";

export type SubmissionRow = {
  id: string;
  kind: string;
  name: string;
  email: string;
  status: string;
  flagged: boolean;
  createdAt: Date;
};

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "new": return "info" as const;
    case "assigned": return "warning" as const;
    case "contacted": return "success" as const;
    case "closed": return "default" as const;
    default: return "default" as const;
  }
}

export function SubmissionsTable({ submissions }: { submissions: SubmissionRow[] }) {
  return (
    <DataTable>
      <DataTableHead>
        <tr>
          <DataTableHeaderCell>Name</DataTableHeaderCell>
          <DataTableHeaderCell>Email</DataTableHeaderCell>
          <DataTableHeaderCell>Kind</DataTableHeaderCell>
          <DataTableHeaderCell>Status</DataTableHeaderCell>
          <DataTableHeaderCell>Flagged</DataTableHeaderCell>
          <DataTableHeaderCell className="hidden sm:table-cell">Received</DataTableHeaderCell>
        </tr>
      </DataTableHead>
      <tbody>
        {submissions.map((s) => (
          <DataTableRow key={s.id}>
            <DataTableCell>
              <a
                href={`/admin/submissions/${s.id}`}
                className="font-medium text-[var(--color-mgmt-text)] hover:text-[var(--color-mgmt-accent)] transition-colors"
              >
                {s.name}
              </a>
            </DataTableCell>
            <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">
              {s.email}
            </DataTableCell>
            <DataTableCell className="text-[var(--color-mgmt-text-secondary)] capitalize">
              {s.kind}
            </DataTableCell>
            <DataTableCell>
              <StatusBadge variant={statusVariant(s.status)}>{s.status}</StatusBadge>
            </DataTableCell>
            <DataTableCell>
              {s.flagged ? <StatusBadge variant="danger">Flagged</StatusBadge> : "—"}
            </DataTableCell>
            <DataTableCell className="hidden sm:table-cell text-[var(--color-mgmt-text-muted)] text-xs font-mono">
              {s.createdAt.toLocaleDateString()}
            </DataTableCell>
          </DataTableRow>
        ))}
      </tbody>
    </DataTable>
  );
}
