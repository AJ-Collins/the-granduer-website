import { SectionCard } from "./section-card";
import { Skeleton } from "./skeleton";

export function DetailSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="space-y-4 p-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72" />
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
