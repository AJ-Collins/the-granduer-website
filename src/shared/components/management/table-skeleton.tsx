import { Skeleton } from "./skeleton";

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-[var(--radius-mgmt-lg)] border border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface)] overflow-hidden">
      <div className="flex gap-4 px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)]">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)] last:border-0">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
