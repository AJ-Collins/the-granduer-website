import { SectionCard, StatusBadge } from "@/shared/components/management";
import { InfoRow } from "@/domains/admin/users";

export type ProposalSubmissionData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  assignedToEmail: string | null;
  eventTypeName: string | null;
  eventDate: Date | null;
  eventTime: string | null;
  guests: number | null;
  packageInterest: string | null;
  services: string[];
  budget: string | null;
  details: string | null;
  source: string | null;
  createdAt: Date;
};

export function ProposalSubmissionDetail({
  submission,
  action,
}: {
  submission: ProposalSubmissionData;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Contact Information"
        actions={action}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow label="Name / organisation / role" value={submission.name} />
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

      <SectionCard title="Proposal Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow label="Event type" value={submission.eventTypeName ?? "—"} />
          <InfoRow
            label="Event date"
            value={submission.eventDate ? submission.eventDate.toLocaleDateString() : "—"}
          />
          <InfoRow label="Preferred time" value={submission.eventTime ?? "—"} />
          <InfoRow
            label="Estimated guests"
            value={submission.guests !== null ? String(submission.guests) : "—"}
          />
          <InfoRow label="Package interest" value={submission.packageInterest ?? "—"} />
          <InfoRow
            label="Services required"
            value={submission.services.length > 0 ? submission.services.join(", ") : "—"}
          />
          <InfoRow label="Budget range" value={submission.budget ?? "—"} />
          <InfoRow label="Heard about us" value={submission.source ?? "—"} />
          <InfoRow label="Special requirements" value={submission.details ?? "—"} />
        </div>
      </SectionCard>
    </div>
  );
}
