import { Badge } from "@/shared/components/ui/Badge";

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

const FIELDS: { label: string; render: (s: SubmissionDetailData) => string }[] = [
  { label: "Kind", render: (s) => s.kind },
  { label: "Name", render: (s) => s.name },
  { label: "Email", render: (s) => s.email },
  { label: "Phone", render: (s) => s.phone ?? "—" },
  { label: "Message", render: (s) => s.message ?? "—" },
  { label: "Event date", render: (s) => (s.eventDate ? s.eventDate.toLocaleDateString() : "—") },
  { label: "Assigned to", render: (s) => s.assignedToEmail ?? "Unassigned" },
  { label: "Notes", render: (s) => s.notes ?? "—" },
  { label: "Received", render: (s) => s.createdAt.toLocaleString() },
];

export function SubmissionDetail({ submission }: { submission: SubmissionDetailData }) {
  return (
    <div>
      <h1>
        {submission.name} <Badge>{submission.status}</Badge>
      </h1>
      <dl>
        {FIELDS.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.render(submission)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
