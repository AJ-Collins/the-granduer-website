import { PageHeader, SectionCard, EmptyState } from "@/shared/components/management";
import { IconSettings } from "@/shared/components/management/icons";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="General configuration, security, and platform preferences."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="General" description="Basic platform configuration">
          <EmptyState
            icon={<IconSettings />}
            title="Settings coming soon"
            description="Platform configuration options will be available here."
          />
        </SectionCard>
      </div>
    </>
  );
}
