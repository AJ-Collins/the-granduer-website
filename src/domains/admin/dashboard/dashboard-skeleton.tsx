import { Skeleton } from "@/shared/components/management";

export function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)] p-4 sm:p-5 space-y-3"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-64 w-full mb-8 rounded-[var(--radius-mgmt-lg)]" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="h-72 w-full rounded-[var(--radius-mgmt-lg)]" />
        <Skeleton className="h-72 w-full rounded-[var(--radius-mgmt-lg)]" />
      </div>
    </>
  );
}
