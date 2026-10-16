import { PageHeader, MgmtButton } from "@/shared/components/management";
import { IconArrowLeft } from "@/shared/components/management/icons";
import { OutboxDetailView } from "@/domains/admin/outbox";

export default async function OutboxDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="Outbox Entry"
        description="View notification delivery details, payload, and attempt history."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Outbox", href: "/admin/outbox" },
          { label: "Entry Details" },
        ]}
        actions={
          <MgmtButton variant="ghost" size="sm" href="/admin/outbox">
            <IconArrowLeft size={16} />
            Back to Outbox
          </MgmtButton>
        }
      />
      <OutboxDetailView entryId={id} />
    </>
  );
}
