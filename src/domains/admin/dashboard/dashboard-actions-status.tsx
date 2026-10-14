import { QuickActionCard, SectionCard, StatusRow } from "@/shared/components/management";
import { IconActivity, IconUsers } from "@/shared/components/management/icons";

export function DashboardActionsStatus() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <SectionCard title="Quick Actions" description="Common administrative workflows">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickActionCard href="/users/new" title="Create User" description="Add a new administrator or editor" icon={<IconUsers />} />
          <QuickActionCard href="/roles" title="Manage Roles" description="Configure roles and access policies" icon={<IconActivity />} />
          <QuickActionCard href="/users" title="View All Users" description="Browse and filter user accounts" icon={<IconUsers />} />
          <QuickActionCard href="/settings" title="Platform Settings" description="Configure environment settings" icon={<IconActivity />} />
        </div>
      </SectionCard>
      <SectionCard title="System Status" description="Platform operational health">
        <div className="space-y-3.5">
          <StatusRow label="PostgreSQL Database" status="Operational (99.98%)" variant="success" />
          <StatusRow label="Session &amp; Auth Service" status="Operational" variant="success" />
          <StatusRow label="Email Notification Outbox" status="Operational" variant="success" />
          <StatusRow label="MinIO Object Storage" status="Operational" variant="success" />
        </div>
      </SectionCard>
    </div>
  );
}
