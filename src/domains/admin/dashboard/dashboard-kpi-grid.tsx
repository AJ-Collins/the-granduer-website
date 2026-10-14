import { StatCard } from "@/shared/components/management";
import {
  IconCalendar,
  IconInbox,
  IconMail,
  IconPackage,
  IconUsers,
} from "@/shared/components/management/icons";
import type { getDashboardStats } from "@/server/admin/services/get-dashboard-stats";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

export function DashboardKpiGrid({ stats }: { stats: Stats | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      <StatCard label="Total Users" value={stats?.users ?? "—"} icon={<IconUsers />} trend="+3 this month" href="/users" />
      <StatCard
        label="New Enquiries"
        value={stats?.enquiriesNew ?? "—"}
        icon={<IconInbox />}
        trend={stats?.enquiriesNew ? `${stats.enquiriesNew} awaiting review` : "+18% vs last mo"}
      />
      <StatCard label="Total Enquiries" value={stats?.enquiriesTotal ?? "—"} icon={<IconMail />} trend="Past 12 months" />
      <StatCard label="Published Packages" value={stats?.publishedPackages ?? "—"} icon={<IconPackage />} />
      <StatCard label="Published Events" value={stats?.publishedEvents ?? "—"} icon={<IconCalendar />} />
    </div>
  );
}
