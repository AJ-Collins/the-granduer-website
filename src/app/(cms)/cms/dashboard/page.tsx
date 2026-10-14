import {
  PageHeader,
  StatCard,
  SectionCard,
  ChartContainer,
  DonutChart,
  BarChart,
  MgmtButton,
} from "@/shared/components/management";
import {
  IconPackage,
  IconCalendar,
  IconFileText,
  IconImage,
  IconStar,
  IconHelpCircle,
  IconPlus,
} from "@/shared/components/management/icons";
import { getCmsDashboardStats } from "@/server/cms/services/get-cms-dashboard-stats";

export default async function CmsDashboardPage() {
  const data = await getCmsDashboardStats();

  return (
    <>
      <PageHeader
        title="CMS Studio Dashboard"
        description="Manage venue catalogue, editorial packages, customer testimonials, and media galleries."
        breadcrumbs={[
          { label: "CMS Studio", href: "/cms/dashboard" },
          { label: "Dashboard" },
        ]}
        actions={
          <MgmtButton variant="primary" size="sm" href="/cms/packages">
            <IconPlus size={15} />
            <span>Manage Packages</span>
          </MgmtButton>
        }
      />

      {/* ─── 1. Content & Catalogue KPI Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Event Packages"
          value={data.packagesCount}
          icon={<IconPackage />}
          href="/cms/packages"
          trend="4 tiers active"
        />
        <StatCard
          label="Event Types"
          value={data.eventsCount}
          icon={<IconCalendar />}
          href="/cms/events"
        />
        <StatCard
          label="Content Pages"
          value={data.contentPagesCount}
          icon={<IconFileText />}
          href="/cms/content"
        />
        <StatCard
          label="Gallery Photos"
          value={data.galleryImagesCount}
          icon={<IconImage />}
          href="/cms/gallery"
        />
        <StatCard
          label="Testimonials"
          value={data.testimonialsCount}
          icon={<IconStar />}
          href="/cms/testimonials"
        />
      </div>

      {/* ─── 2. Visualizations ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Package Tiers Breakdown */}
        <ChartContainer
          title="Package Tier Composition"
          description="Catalogue distribution across Essential, Classic, Signature, and Bespoke offerings."
          badge={data.isSampleData ? "Demo Catalogue" : "Live Catalogue"}
          badgeVariant={data.isSampleData ? "warning" : "success"}
        >
          <DonutChart
            data={data.tierBreakdown}
            centerLabel="Tiers"
          />
        </ChartContainer>

        {/* Media & Content Inventory */}
        <ChartContainer
          title="Catalogue Inventory Distribution"
          description="Overview of published editorial content, gallery assets, and client testimonials."
        >
          <BarChart
            data={data.catalogueDistribution}
            valueLabel="items"
          />
        </ChartContainer>
      </div>

      {/* ─── 3. Editorial Workflows & Quick Actions ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Editorial Actions" description="Fast workflows for content management">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CmsActionCard
              href="/cms/packages"
              title="Edit Packages"
              description="Configure prices and tier inclusions"
              icon={<IconPackage />}
            />
            <CmsActionCard
              href="/cms/events"
              title="Event Experiences"
              description="Update venue event categories"
              icon={<IconCalendar />}
            />
            <CmsActionCard
              href="/cms/gallery"
              title="Media Gallery"
              description="Upload high-res event photography"
              icon={<IconImage />}
            />
            <CmsActionCard
              href="/cms/faqs"
              title="Manage FAQs"
              description="Edit client guidance & questions"
              icon={<IconHelpCircle />}
            />
          </div>
        </SectionCard>

        <SectionCard title="Publishing Status" description="Live site synchronization">
          <div className="space-y-3.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-mgmt-text)]">Public Website</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-medium">
                Synchronized
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-mgmt-text)]">Image CDN (MinIO)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-mgmt-text)]">Booking Outbox</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-medium">
                Active
              </span>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function CmsActionCard({
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
