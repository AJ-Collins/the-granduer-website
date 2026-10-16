import { PageHeader } from "@/shared/components/management";
import { SiteSettingsForm } from "@/domains/admin/settings";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage the contact details shown across the public site."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />
      <SiteSettingsForm />
    </>
  );
}
