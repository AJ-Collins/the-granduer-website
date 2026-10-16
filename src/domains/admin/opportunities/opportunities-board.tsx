import {
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  StatusBadge,
  EmptyState,
} from "@/shared/components/management";
import { IconInbox } from "@/shared/components/management/icons";
import { QuickAdvanceButton } from "./quick-advance-button";
import { stageLabel, type OpportunityStage } from "./opportunity-stages";

export type OpportunityRow = {
  id: string;
  stage: OpportunityStage;
  stageChangedAt: Date | string;
  createdAt: Date | string;
  enquiry: { id: string; name: string; email: string };
  transitionCount: number;
};

function daysInStage(since: Date | string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(since).getTime()) / 86_400_000));
  return days === 0 ? "today" : `${days}d`;
}

export function OpportunitiesBoard({ opportunities }: { opportunities: OpportunityRow[] }) {
  if (opportunities.length === 0) {
    return (
      <EmptyState
        icon={<IconInbox />}
        title="No opportunities yet"
        description="Convert a qualified submission to start tracking it through the pipeline."
      />
    );
  }
  return (
    <DataTable>
      <DataTableHead>
        <tr>
          <DataTableHeaderCell>Opportunity</DataTableHeaderCell>
          <DataTableHeaderCell className="hidden sm:table-cell">Contact</DataTableHeaderCell>
          <DataTableHeaderCell>Stage</DataTableHeaderCell>
          <DataTableHeaderCell className="hidden md:table-cell">Updated</DataTableHeaderCell>
          <DataTableHeaderCell className="text-right">Actions</DataTableHeaderCell>
        </tr>
      </DataTableHead>
      <tbody>
        {opportunities.map((o) => (
          <DataTableRow key={o.id}>
            <DataTableCell>
              <a
                href={`/admin/opportunities/${o.id}`}
                className="font-medium text-[var(--color-mgmt-text)] hover:text-[var(--color-mgmt-accent)] transition-colors"
              >
                {o.enquiry.name}
              </a>
              <p className="text-[11px] text-[var(--color-mgmt-text-muted)] sm:hidden truncate">
                {o.enquiry.email}
              </p>
            </DataTableCell>
            <DataTableCell className="hidden sm:table-cell text-[var(--color-mgmt-text-secondary)]">
              {o.enquiry.email}
            </DataTableCell>
            <DataTableCell>
              <StatusBadge variant={o.stage === "reviewed" ? "success" : "info"}>
                {stageLabel(o.stage)}
              </StatusBadge>
            </DataTableCell>
            <DataTableCell className="hidden md:table-cell text-[var(--color-mgmt-text-muted)] text-xs font-mono">
              {daysInStage(o.stageChangedAt)} ago · {o.transitionCount} move{o.transitionCount === 1 ? "" : "s"}
            </DataTableCell>
            <DataTableCell className="text-right">
              <QuickAdvanceButton opportunityId={o.id} currentStage={o.stage} />
            </DataTableCell>
          </DataTableRow>
        ))}
      </tbody>
    </DataTable>
  );
}
