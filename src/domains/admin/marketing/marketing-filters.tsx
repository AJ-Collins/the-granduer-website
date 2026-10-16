import { cn } from "@/shared/lib/cn";

export function MarketingFilters({ active }: { active: string }) {
  const filters = [
    { label: "Overview", href: "/admin/marketing", match: "overview" },
    { label: "Sources", href: "/admin/marketing?view=sources", match: "sources" },
  ];
  return (
    <nav aria-label="Marketing views" className="flex gap-2 overflow-x-auto pb-1 mb-4">
      {filters.map((f) => (
        <a
          key={f.match}
          href={f.href}
          aria-current={active === f.match ? "page" : undefined}
          className={cn(
            "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            active === f.match
              ? "border-[var(--color-mgmt-accent)] bg-[var(--color-mgmt-accent)]/10 text-[var(--color-mgmt-accent)]"
              : "border-[var(--color-mgmt-border)] text-[var(--color-mgmt-text-secondary)] hover:border-[var(--color-mgmt-text-muted)]",
          )}
        >
          {f.label}
        </a>
      ))}
    </nav>
  );
}
