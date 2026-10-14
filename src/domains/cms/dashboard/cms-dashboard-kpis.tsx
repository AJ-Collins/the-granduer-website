import { StatCard } from "@/shared/components/management";
import {
  IconCalendar,
  IconFileText,
  IconImage,
  IconPackage,
  IconStar,
} from "@/shared/components/management/icons";
import type { getCmsDashboardStats } from "@/server/cms/services/get-cms-dashboard-stats";

type Data = Awaited<ReturnType<typeof getCmsDashboardStats>>;

export function CmsDashboardKpis({ data }: { data: Data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      <StatCard label="Event Packages" value={data.packagesCount} icon={<IconPackage />} href="/packages" trend="4 tiers active" />
      <StatCard label="Event Types" value={data.eventsCount} icon={<IconCalendar />} href="/events" />
      <StatCard label="Content Pages" value={data.contentPagesCount} icon={<IconFileText />} href="/content" />
      <StatCard label="Gallery Photos" value={data.galleryImagesCount} icon={<IconImage />} href="/gallery" />
      <StatCard label="Testimonials" value={data.testimonialsCount} icon={<IconStar />} href="/testimonials" />
    </div>
  );
}
