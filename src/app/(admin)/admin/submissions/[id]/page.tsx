import { AssignSubmissionForm, SubmissionDetail, UpdateSubmissionStatusForm } from "@/domains/admin/submissions";
import { notFound } from "next/navigation";
import { getManagedEnquiry } from "@/server/enquiries/services/managed/get-managed-enquiry";
import { getUserById } from "@/server/users/services/get-user-by-id";
import { listUsers } from "@/server/users/services/list-users";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await getManagedEnquiry(id);
  if (!enquiry) notFound();
  const [assignee, staff] = await Promise.all([
    enquiry.assignedToId ? getUserById(enquiry.assignedToId) : null,
    listUsers(1, 100),
  ]);
  return (
    <main>
      <SubmissionDetail
        submission={{ ...enquiry, assignedToEmail: assignee?.email ?? null }}
      />
      <AssignSubmissionForm
        id={enquiry.id}
        staff={staff.items}
        currentAssigneeId={enquiry.assignedToId}
      />
      <UpdateSubmissionStatusForm
        id={enquiry.id}
        currentStatus={enquiry.status}
        currentNotes={enquiry.notes}
      />
    </main>
  );
}
