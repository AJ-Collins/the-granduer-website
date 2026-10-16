import { SectionCard, StatusBadge } from "@/shared/components/management";
import { InfoRow } from "@/domains/admin/users";

export type ViewingSubmissionData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  assignedToEmail: string | null;
  eventTypeName: string | null;
  preferredDate: Date | null;
  altDate: Date | null;
  details: string | null;
  guests: number | null;
  message: string | null;
  createdAt: Date;
};

export function ViewingSubmissionDetail({
  submission,
  action,
}: {
  submission: ViewingSubmissionData;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Contact Information"
        actions={action}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow label="Name" value={submission.name} />
          <InfoRow label="Email" value={submission.email} />
          <InfoRow label="Phone / WhatsApp" value={submission.phone ?? "—"} />
          <InfoRow
            label="Status"
            value={<StatusBadge variant="info">{submission.status}</StatusBadge>}
          />
          <InfoRow label="Assigned to" value={submission.assignedToEmail ?? "Unassigned"} />
          <InfoRow label="Received" value={submission.createdAt.toLocaleString()} />
        </div>
      </SectionCard>

      <SectionCard title="Viewing Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow label="Event type" value={submission.eventTypeName ?? "—"} />
          <InfoRow
            label="Preferred viewing date"
            value={submission.preferredDate ? submission.preferredDate.toLocaleDateString() : "—"}
          />
          <InfoRow
            label="Alternative date"
            value={submission.altDate ? submission.altDate.toLocaleDateString() : "—"}
          />
          <InfoRow label="Approx. event date" value={submission.details ?? "—"} />
          <InfoRow
            label="Estimated guests"
            value={submission.guests !== null ? String(submission.guests) : "—"}
          />
          <InfoRow label="Message" value={submission.message ?? "—"} />
        </div>
      </SectionCard>
    </div>
  );
}
