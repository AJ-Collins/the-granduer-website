"use client";

import { useState, useEffect, useCallback } from "react";
import {
  SectionCard,
  StatusBadge,
  Alert,
  Skeleton,
} from "@/shared/components/management";
import { IconMail, IconUser } from "@/shared/components/management/icons";
import { InfoRow } from "@/domains/admin/users";
import { RetryButton } from "./retry-button";

type OutboxEntry = {
  id: string;
  to: string;
  type: string;
  subject: string;
  text: string;
  html: string | null;
  status: string;
  attempts: number;
  nextAttemptAt: string | null;
  lastError: string | null;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "sent":
      return "success" as const;
    case "pending":
      return "warning" as const;
    case "failed":
      return "danger" as const;
    case "sending":
      return "info" as const;
    default:
      return "default" as const;
  }
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function OutboxDetailView({ entryId }: { entryId: string }) {
  const [entry, setEntry] = useState<OutboxEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/outbox/${entryId}`);
      if (!res.ok) throw new Error(res.status === 404 ? "Entry not found." : "Failed to load entry.");
      const data = await res.json();
      setEntry(data.data ?? data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }, [entryId]);

  useEffect(() => {
    fetchEntry();
  }, [fetchEntry]);

  const handleRetried = useCallback(() => {
    fetchEntry();
  }, [fetchEntry]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="space-y-5">
        <SectionCard>
          <div className="space-y-4 p-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </SectionCard>
        <SectionCard>
          <div className="space-y-3 p-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </SectionCard>
      </div>
    );
  }

  /* ── Error state ── */
  if (error || !entry) {
    return <Alert variant="error">{error || "Entry not found."}</Alert>;
  }

  const isFailed = entry.status.toLowerCase() === "failed";

  return (
    <div className="space-y-5">
      {/* ── Overview ── */}
      <SectionCard
        title="Entry Overview"
        actions={isFailed ? <RetryButton entryId={entry.id} onRetried={handleRetried} /> : undefined}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow
            icon={<IconUser size={15} />}
            label="Recipient"
            value={entry.to}
          />
          <InfoRow
            icon={<IconMail size={15} />}
            label="Type"
            value={<span className="capitalize">{entry.type}</span>}
          />
          <InfoRow
            label="Status"
            value={
              <StatusBadge variant={statusVariant(entry.status)}>
                {entry.status}
              </StatusBadge>
            }
          />
          <InfoRow
            label="Attempts"
            value={<span className="tabular-nums">{entry.attempts}</span>}
          />
          <InfoRow label="Subject" value={entry.subject || "—"} />
          <InfoRow label="Entry ID" value={<span className="font-mono text-[11px]">{entry.id}</span>} />
          <InfoRow label="Created" value={formatDate(entry.createdAt)} />
          <InfoRow label="Last Updated" value={formatDate(entry.updatedAt)} />
          {entry.sentAt && <InfoRow label="Sent At" value={formatDate(entry.sentAt)} />}
          {entry.nextAttemptAt && entry.status.toLowerCase() !== "sent" && (
            <InfoRow label="Next Attempt" value={formatDate(entry.nextAttemptAt)} />
          )}
        </div>
      </SectionCard>

      {/* ── Payload summary ── */}
      <SectionCard title="Payload Summary">
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-1.5">
              Text Body
            </h3>
            <pre className="text-sm text-[var(--color-mgmt-text-secondary)] bg-[var(--color-mgmt-bg)] rounded-[var(--radius-mgmt-md)] p-3 overflow-x-auto whitespace-pre-wrap max-h-48 border border-[var(--color-mgmt-border-subtle)]">
              {entry.text || "—"}
            </pre>
          </div>
          {entry.html && (
            <div>
              <h3 className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-1.5">
                HTML Body
              </h3>
              <pre className="text-sm text-[var(--color-mgmt-text-secondary)] bg-[var(--color-mgmt-bg)] rounded-[var(--radius-mgmt-md)] p-3 overflow-x-auto whitespace-pre-wrap max-h-48 border border-[var(--color-mgmt-border-subtle)]">
                {entry.html}
              </pre>
            </div>
          )}
        </div>
      </SectionCard>

      {/* ── Error details (only if failed) ── */}
      {isFailed && entry.lastError && (
        <SectionCard title="Last Error">
          <Alert variant="error" title="Delivery Error">
            <pre className="whitespace-pre-wrap text-xs font-mono mt-1">{entry.lastError}</pre>
          </Alert>
        </SectionCard>
      )}

      {/* ── Attempt history ── */}
      <SectionCard title="Attempt History" description="Timeline of delivery attempts for this entry.">
        <div className="space-y-3">
          {entry.attempts === 0 && entry.status.toLowerCase() === "pending" && (
            <p className="text-sm text-[var(--color-mgmt-text-muted)]">No delivery attempts yet.</p>
          )}
          {entry.attempts > 0 && (
            <div className="relative border-l-2 border-[var(--color-mgmt-border-subtle)] pl-4 space-y-4 ml-2">
              {/* Current / last attempt */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--color-mgmt-accent)] ring-2 ring-[var(--color-mgmt-surface)]" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[var(--color-mgmt-text)]">
                    Attempt #{entry.attempts}
                  </p>
                  <p className="text-xs text-[var(--color-mgmt-text-muted)]">
                    {formatDate(entry.updatedAt)}
                  </p>
                  <StatusBadge variant={statusVariant(entry.status)}>
                    {entry.status}
                  </StatusBadge>
                  {entry.lastError && (
                    <p className="text-xs text-[var(--color-mgmt-text-secondary)] mt-1 font-mono">
                      {entry.lastError}
                    </p>
                  )}
                </div>
              </div>

              {/* Previous attempts (summary) */}
              {entry.attempts > 1 && (
                <div className="relative">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--color-mgmt-border)] ring-2 ring-[var(--color-mgmt-surface)]" />
                  <p className="text-xs text-[var(--color-mgmt-text-muted)]">
                    {entry.attempts - 1} previous attempt{entry.attempts - 1 !== 1 ? "s" : ""} · first queued {formatDate(entry.createdAt)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
