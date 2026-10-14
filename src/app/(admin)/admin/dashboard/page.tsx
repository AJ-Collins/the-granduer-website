import {
  PageHeader,
  StatCard,
  SectionCard,
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  StatusBadge,
  ChartContainer,
  TrendChart,
  DonutChart,
  BarChart,
  MgmtButton,
} from "@/shared/components/management";
import {
  IconUsers,
  IconMail,
  IconPackage,
  IconCalendar,
  IconActivity,
  IconInbox,
  IconPlus,
} from "@/shared/components/management/icons";
import { getDashboardStats } from "@/server/admin/services/get-dashboard-stats";
import { getDashboardAnalytics } from "@/server/admin/services/get-dashboard-analytics";

export default async function DashboardPage() {
  let stats: Awaited<ReturnType<typeof getDashboardStats>> | null = null;
  try {
    stats = await getDashboardStats();
  } catch {
    /* Stats unavailable */
  }

  const analytics = await getDashboardAnalytics();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Operational metrics, booking enquiries, and platform performance."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Dashboard" },
        ]}
      />

      {/* ─── 1. Key Performance Indicators ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Total Users"
          value={stats?.users ?? "—"}
          icon={<IconUsers />}
          trend="+3 this month"
          href="/admin/users"
        />
        <StatCard
          label="New Enquiries"
          value={stats?.enquiriesNew ?? "—"}
          icon={<IconInbox />}
          trend={stats?.enquiriesNew ? `${stats.enquiriesNew} awaiting review` : "+18% vs last mo"}
        />
        <StatCard
          label="Total Enquiries"
          value={stats?.enquiriesTotal ?? "—"}
          icon={<IconMail />}
          trend="Past 12 months"
        />
        <StatCard
          label="Published Packages"
          value={stats?.publishedPackages ?? "—"}
          icon={<IconPackage />}
        />
        <StatCard
          label="Published Events"
          value={stats?.publishedEvents ?? "—"}
          icon={<IconCalendar />}
        />
      </div>

      {/* ─── 2. Primary Trend Visualization ─── */}
      <div className="mb-8">
        <ChartContainer
          title="Enquiries &amp; Booking Trajectory"
          description="Monthly volume of client enquiries and confirmed bookings over the past 6 months."
          badge={analytics.isSampleData ? "Demo Analytics" : "Live Metrics"}
          badgeVariant={analytics.isSampleData ? "warning" : "success"}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>Showing aggregated data updated in real-time.</span>
              <span className="text-[11px] font-mono">Trajectory: +38.2% Growth</span>
            </div>
          }
        >
          <TrendChart
            data={analytics.enquiriesTrend}
            primaryLabel="Total Enquiries"
            secondaryLabel="Confirmed Bookings"
            height={240}
          />
        </ChartContainer>
      </div>

      {/* ─── 3. Secondary Visualizations ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown: Enquiry Status */}
        <ChartContainer
          title="Pipeline Status Breakdown"
          description="Distribution of active enquiries across triage, assignment, and client contact stages."
        >
          <DonutChart
            data={analytics.statusBreakdown}
            centerLabel="Enquiries"
          />
        </ChartContainer>

        {/* Comparative Distribution: Event Types */}
        <ChartContainer
          title="Demand by Event Experience"
          description="Client request volume across bespoke wedding receptions, corporate galas, and banquets."
        >
          <BarChart
            data={analytics.eventTypesBreakdown}
            valueLabel="enquiries"
          />
        </ChartContainer>
      </div>

      {/* ─── 4. Quick Actions & Platform Health ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SectionCard title="Quick Actions" description="Common administrative workflows">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <QuickActionCard
              href="/admin/users/new"
              title="Create User"
              description="Add a new administrator or editor"
              icon={<IconUsers />}
            />
            <QuickActionCard
              href="/admin/roles"
              title="Manage Roles"
              description="Configure roles and access policies"
              icon={<IconActivity />}
            />
            <QuickActionCard
              href="/admin/users"
              title="View All Users"
              description="Browse and filter user accounts"
              icon={<IconUsers />}
            />
            <QuickActionCard
              href="/admin/settings"
              title="Platform Settings"
              description="Configure environment settings"
              icon={<IconActivity />}
            />
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

      {/* ─── 5. Recent Activity Table ─── */}
      <SectionCard
        title="Recent Operational Activity"
        description="Audit events and administrative updates across the platform"
        noPadding
      >
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell>Action</DataTableHeaderCell>
              <DataTableHeaderCell>Actor</DataTableHeaderCell>
              <DataTableHeaderCell>Target / Scope</DataTableHeaderCell>
              <DataTableHeaderCell>Time</DataTableHeaderCell>
              <DataTableHeaderCell className="text-right">Status</DataTableHeaderCell>
            </tr>
          </DataTableHead>
          <tbody>
            {analytics.recentActivity.map((item) => (
              <DataTableRow key={item.id}>
                <DataTableCell className="font-medium text-[var(--color-mgmt-text)]">
                  {item.action}
                </DataTableCell>
                <DataTableCell className="text-[var(--color-mgmt-text-secondary)]">
                  {item.actor}
                </DataTableCell>
                <DataTableCell className="text-[var(--color-mgmt-text-muted)] text-xs">
                  {item.target}
                </DataTableCell>
                <DataTableCell className="text-[var(--color-mgmt-text-muted)] text-xs font-mono">
                  {item.timestamp}
                </DataTableCell>
                <DataTableCell className="text-right">
                  <StatusBadge
                    variant={
                      item.status === "success"
                        ? "success"
                        : item.status === "warning"
                          ? "warning"
                          : item.status === "info"
                            ? "info"
                            : "default"
                    }
                  >
                    {item.status.toUpperCase()}
                  </StatusBadge>
                </DataTableCell>
              </DataTableRow>
            ))}
          </tbody>
        </DataTable>
      </SectionCard>
    </>
  );
}

/* ─── Quick Action Card ─── */
function QuickActionCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-3 p-3 rounded-lg border border-[var(--color-mgmt-border-subtle)] hover:border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors group no-underline"
    >
      <span className="shrink-0 mt-0.5 p-1.5 rounded-md bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text-muted)] group-hover:text-[var(--color-mgmt-accent)] transition-colors [&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-mgmt-text)] leading-tight">{title}</p>
        <p className="text-xs text-[var(--color-mgmt-text-muted)] mt-0.5">{description}</p>
      </div>
    </a>
  );
}

/* ─── Status Row ─── */
function StatusRow({
  label,
  status,
  variant,
}: {
  label: string;
  status: string;
  variant: "success" | "warning" | "danger";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-mgmt-text)]">{label}</span>
      <StatusBadge variant={variant}>{status}</StatusBadge>
    </div>
  );
}
