"use client";

import { useEffect, useState } from "react";
import { SectionCard, EmptyState, Skeleton } from "@/shared/components/management";
import { IconActivity } from "@/shared/components/management/icons";

type AuditEntry = {
  id: string;
  action: string;
  actorEmail?: string | null;
  actorId?: string | null;
  createdAt: string;
  details?: Record<string, unknown> | null;
};

export function UserAuditSection({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`/api/admin/audit?entityType=ACCOUNT&entityId=${encodeURIComponent(userId)}&pageSize=10`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load audit");
        return res.json();
      })
      .then((res) => {
        if (!cancelled && res.success && Array.isArray(res.data)) {
          setEntries(res.data);
        }
      })
      .catch(() => {
        // Fallback to empty state on error or permission limitation
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <SectionCard
      title="Audit History"
      description="Recent security, role changes, and account activity for this user."
    >
      {loading ? (
        <div className="space-y-3 py-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : entries.length === 0 ? (
        <EmptyState
          icon={<IconActivity size={24} />}
          title="No audit history"
          description="Security and account change events for this user will appear here."
        />
      ) : (
        <div className="divide-y divide-[var(--color-mgmt-border-subtle)]">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="mt-0.5 p-1.5 rounded-full bg-[var(--color-mgmt-border-subtle)] text-[var(--color-mgmt-text-muted)] shrink-0">
                <IconActivity size={12} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[var(--color-mgmt-text)]">
                  <span className="font-medium">{entry.action.replace(/_/g, " ").toLowerCase()}</span>
                  {entry.actorEmail && (
                    <span className="text-[var(--color-mgmt-text-muted)]"> by {entry.actorEmail}</span>
                  )}
                </p>
                <p className="text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
