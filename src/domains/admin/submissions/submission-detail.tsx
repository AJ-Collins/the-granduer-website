import { SectionCard, StatusBadge } from "@/shared/components/management";
import { InfoRow } from "@/domains/admin/users";

export type SubmissionDetailData = {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  eventDate: Date | null;
  status: string;
  assignedToEmail: string | null;
  notes: string | null;
  createdAt: Date;
};

export function SubmissionDetail({
  submission,
  action,
}: {
  submission: SubmissionDetailData;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <SectionCard title="Submission Details" actions={action}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow label="Kind" value={submission.kind} />
          <InfoRow label="Name" value={submission.name} />
          <InfoRow label="Email" value={submission.email} />
          <InfoRow label="Phone" value={submission.phone ?? "—"} />
          <InfoRow label="Message" value={submission.message ?? "—"} />
          <InfoRow
            label="Event date"
            value={submission.eventDate ? submission.eventDate.toLocaleDateString() : "—"}
          />
          <InfoRow label="Assigned to" value={submission.assignedToEmail ?? "Unassigned"} />
          <InfoRow label="Notes" value={submission.notes ?? "—"} />
          <InfoRow
            label="Status"
            value={<StatusBadge variant="info">{submission.status}</StatusBadge>}
          />
          <InfoRow label="Received" value={submission.createdAt.toLocaleString()} />
        </div>
      </SectionCard>
    </div>
  );
}
