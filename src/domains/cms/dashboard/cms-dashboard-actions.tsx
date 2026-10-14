import { QuickActionCard, SectionCard } from "@/shared/components/management";
import {
  IconCalendar,
  IconHelpCircle,
  IconImage,
  IconPackage,
} from "@/shared/components/management/icons";

const PUBLISHING_ROWS = ["Public Website|Synchronized", "Image CDN (MinIO)|Connected", "Booking Outbox|Active"];

export function CmsDashboardActions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="Editorial Actions" description="Fast workflows for content management">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickActionCard href="/packages" title="Edit Packages" description="Configure prices and tier inclusions" icon={<IconPackage />} />
          <QuickActionCard href="/events" title="Event Experiences" description="Update venue event categories" icon={<IconCalendar />} />
          <QuickActionCard href="/gallery" title="Media Gallery" description="Upload high-res event photography" icon={<IconImage />} />
          <QuickActionCard href="/faqs" title="Manage FAQs" description="Edit client guidance & questions" icon={<IconHelpCircle />} />
        </div>
      </SectionCard>
      <SectionCard title="Publishing Status" description="Live site synchronization">
        <div className="space-y-3.5 text-sm">
          {PUBLISHING_ROWS.map((row) => {
            const [label, status] = row.split("|");
            return (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[var(--color-mgmt-text)]">{label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-medium">
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
