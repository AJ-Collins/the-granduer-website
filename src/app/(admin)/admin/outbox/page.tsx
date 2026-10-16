import { PageHeader } from "@/shared/components/management";
import { IconMail } from "@/shared/components/management/icons";
import { OutboxTable } from "@/domains/admin/outbox";

export default function OutboxPage() {
  return (
    <>
      <PageHeader
        title="Notification Outbox"
        description="Monitor and manage outgoing notifications across all channels."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Outbox" },
        ]}
      />
      <OutboxTable />
    </>
  );
}
