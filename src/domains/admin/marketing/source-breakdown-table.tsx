import {
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  SectionCard,
} from "@/shared/components/management";
import type { SourceRow } from "@/server/analytics/services/get-source-breakdown";

export function SourceBreakdownTable({ rows }: { rows: SourceRow[] }) {
  return (
    <SectionCard
      title="Lead Sources"
      description="Events and qualified submissions grouped by source, medium, and campaign."
      noPadding
    >
      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell>Source</DataTableHeaderCell>
            <DataTableHeaderCell>Medium</DataTableHeaderCell>
            <DataTableHeaderCell>Campaign</DataTableHeaderCell>
            <DataTableHeaderCell className="text-right">Events</DataTableHeaderCell>
            <DataTableHeaderCell className="text-right">Leads</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {rows.map((r) => (
            <DataTableRow key={`${r.source}|${r.medium}|${r.campaign}`}>
              <DataTableCell className="font-medium text-[var(--color-mgmt-text)]">{r.source}</DataTableCell>
              <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">{r.medium}</DataTableCell>
              <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">{r.campaign}</DataTableCell>
              <DataTableCell className="text-right tabular-nums">{r.events}</DataTableCell>
              <DataTableCell className="text-right tabular-nums">{r.leads}</DataTableCell>
            </DataTableRow>
          ))}
        </tbody>
      </DataTable>
    </SectionCard>
  );
}
