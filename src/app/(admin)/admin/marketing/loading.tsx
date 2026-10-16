import { Skeleton } from "@/shared/components/management";

export default function MarketingLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full rounded-[var(--radius-mgmt-lg)]" />
        <Skeleton className="h-24 w-full rounded-[var(--radius-mgmt-lg)]" />
      </div>
      <Skeleton className="h-72 w-full rounded-[var(--radius-mgmt-lg)]" />
      <Skeleton className="h-48 w-full rounded-[var(--radius-mgmt-lg)]" />
    </div>
  );
}
