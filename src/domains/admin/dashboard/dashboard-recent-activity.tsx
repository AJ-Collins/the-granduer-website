import {
  DataTable,
  DataTableCell,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  SectionCard,
  StatusBadge,
} from "@/shared/components/management";
import type { getDashboardAnalytics } from "@/server/admin/services/get-dashboard-analytics";

type Analytics = Awaited<ReturnType<typeof getDashboardAnalytics>>;

export function DashboardRecentActivity({ analytics }: { analytics: Analytics }) {
  return (
    <SectionCard
      title="Recent Operational Activity"
      description="Audit events and administrative updates across the platform"
      noPadding
    >
      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell>Action</DataTableHeaderCell>
            <DataTableHeaderCell>Actor</DataTableHeaderCell>
            <DataTableHeaderCell>Target / Scope</DataTableHeaderCell>
            <DataTableHeaderCell>Time</DataTableHeaderCell>
            <DataTableHeaderCell className="text-right">Status</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {analytics.recentActivity.map((item) => (
            <DataTableRow key={item.id}>
              <DataTableCell className="font-medium text-[var(--color-mgmt-text)]">{item.action}</DataTableCell>
              <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">{item.actor}</DataTableCell>
              <DataTableCell className="text-[var(--color-mgmt-text-muted)] text-xs">{item.target}</DataTableCell>
              <DataTableCell className="text-[var(--color-mgmt-text-muted)] text-xs font-mono">{item.timestamp}</DataTableCell>
              <DataTableCell className="text-right">
                <StatusBadge
                  variant={
                    item.status === "success"
                      ? "success"
                      : item.status === "warning"
                        ? "warning"
                        : item.status === "info"
                          ? "info"
                          : "default"
                  }
                >
                  {item.status.toUpperCase()}
                </StatusBadge>
              </DataTableCell>
            </DataTableRow>
          ))}
        </tbody>
      </DataTable>
    </SectionCard>
  );
}
