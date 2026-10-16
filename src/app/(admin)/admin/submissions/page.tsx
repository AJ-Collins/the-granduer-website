import { PageHeader, EmptyState } from "@/shared/components/management";
import { IconInbox } from "@/shared/components/management/icons";
import { SubmissionsTable } from "@/domains/admin/submissions";
import { listEnquiries } from "@/server/enquiries/services/managed/list-enquiries";
import { cn } from "@/shared/lib/cn";

const KIND_FILTERS = [
  { label: "All", href: "/admin/submissions" },
  { label: "Viewing", href: "/admin/submissions?kind=viewing" },
  { label: "Proposal", href: "/admin/submissions?kind=proposal" },
  { label: "Flagged", href: "/admin/submissions?flagged=true" },
] as const;

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; flagged?: string }>;
}) {
  const params = await searchParams;
  const kind = params.kind === "viewing" || params.kind === "proposal" ? params.kind : undefined;
  const flagged = params.flagged === "true" ? true : undefined;
  const { items } = await listEnquiries(
    1,
    50,
    undefined,
    { ...(kind && { kind }), ...(flagged !== undefined && { flagged }) },
  );
  const active = flagged ? 3 : kind === "viewing" ? 1 : kind === "proposal" ? 2 : 0;
  return (
    <>
      <PageHeader
        title="Submissions"
        description="Booking enquiries submitted through the public viewing and proposal forms."
        breadcrumbs={[
          { label: "Admin", href: "/dashboard" },
          { label: "Submissions" },
        ]}
      />

      <nav aria-label="Submission filters" className="flex gap-2 overflow-x-auto pb-1 mb-4">
        {KIND_FILTERS.map((f, i) => (
          <a
            key={f.label}
            href={f.href}
            aria-current={i === active ? "page" : undefined}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              i === active
                ? "border-[var(--color-mgmt-accent)] bg-[var(--color-mgmt-accent)]/10 text-[var(--color-mgmt-accent)]"
                : "border-[var(--color-mgmt-border)] text-[var(--color-mgmt-text-secondary)] hover:border-[var(--color-mgmt-text-muted)]",
            )}
          >
            {f.label}
          </a>
        ))}
      </nav>

      {items.length > 0 ? (
        <SubmissionsTable submissions={items} />
      ) : (
        <EmptyState
          icon={<IconInbox />}
          title="No submissions found"
          description="New viewing and proposal enquiries will appear here."
        />
      )}
    </>
  );
}
