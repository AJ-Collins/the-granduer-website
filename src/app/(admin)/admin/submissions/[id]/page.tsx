import {
  AssignSubmissionForm,
  ProposalSubmissionDetail,
  SubmissionDetail,
  UpdateSubmissionStatusForm,
  ViewingSubmissionDetail,
} from "@/domains/admin/submissions";
import { ConvertToOpportunityButton } from "@/domains/admin/opportunities";
import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
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
  const submission = { ...enquiry, assignedToEmail: assignee?.email ?? null };
  const action =
    ["contacted", "closed"].includes(enquiry.status) ? (
      <ConvertToOpportunityButton enquiryId={enquiry.id} />
    ) : undefined;
  return (
    <>
      <PageHeader
        title={enquiry.name}
        description={`Submission from ${enquiry.email}.`}
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Submissions", href: "/admin/submissions" },
          { label: enquiry.name },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/submissions">
            <IconArrowLeft size={16} />
            Back to Submissions
          </MgmtButton>
        }
      />
      <div className="space-y-5">
        {enquiry.kind === "proposal" ? (
          <ProposalSubmissionDetail submission={submission} action={action} />
        ) : enquiry.kind === "viewing" ? (
          <ViewingSubmissionDetail submission={submission} action={action} />
        ) : (
          <SubmissionDetail submission={submission} action={action} />
        )}
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
      </div>
    </>
  );
}
