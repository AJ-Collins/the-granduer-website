"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  StatusBadge,
  EmptyState,
  MgmtButton,
  TableSkeleton,
} from "@/shared/components/management";
import { IconMail } from "@/shared/components/management/icons";
import { OutboxFilters } from "./outbox-filters";

export type OutboxRow = {
  id: string;
  to: string;
  type: string;
  status: string;
  attempts: number;
  nextAttemptAt: string | null;
  updatedAt: string;
  createdAt: string;
  subject: string;
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
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OutboxTable() {
  const [rows, setRows] = useState<OutboxRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const pageSize = 20;

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      if (status !== "all") params.set("status", status);
      if (type !== "all") params.set("type", type);

      const res = await fetch(`/api/admin/outbox?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load outbox entries.");
      const data = await res.json();
      setRows(data.items ?? data.data ?? []);
      setTotal(data.total ?? 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }, [page, status, type]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleStatusChange = useCallback((v: string) => {
    setStatus(v);
    setPage(1);
  }, []);

  const handleTypeChange = useCallback((v: string) => {
    setType(v);
    setPage(1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (loading) {
    return (
      <div className="space-y-4">
        <OutboxFilters status={status} type={type} onStatusChange={handleStatusChange} onTypeChange={handleTypeChange} />
        <TableSkeleton rows={6} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <OutboxFilters status={status} type={type} onStatusChange={handleStatusChange} onTypeChange={handleTypeChange} />
        <div className="py-12 text-center text-sm text-[var(--color-mgmt-text-muted)]">{error}</div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="space-y-4">
        <OutboxFilters status={status} type={type} onStatusChange={handleStatusChange} onTypeChange={handleTypeChange} />
        <EmptyState
          icon={<IconMail />}
          title="No outbox entries"
          description="No notifications match the current filters."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <OutboxFilters status={status} type={type} onStatusChange={handleStatusChange} onTypeChange={handleTypeChange} />

      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell>Recipient</DataTableHeaderCell>
            <DataTableHeaderCell className="hidden sm:table-cell">Type</DataTableHeaderCell>
            <DataTableHeaderCell>Status</DataTableHeaderCell>
            <DataTableHeaderCell className="hidden md:table-cell">Attempts</DataTableHeaderCell>
            <DataTableHeaderCell className="hidden sm:table-cell">Last Update</DataTableHeaderCell>
            <DataTableHeaderCell className="w-16">
              <span className="sr-only">Actions</span>
            </DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {rows.map((entry) => (
            <DataTableRow key={entry.id}>
              <DataTableCell>
                <a
                  href={`/admin/outbox/${entry.id}`}
                  className="font-medium text-[var(--color-mgmt-text)] hover:text-[var(--color-mgmt-accent)] transition-colors"
                >
                  <span className="block truncate max-w-[180px] sm:max-w-none">{entry.to}</span>
                </a>
                {/* Show type inline on mobile where it's hidden in its own column */}
                <span className="block sm:hidden text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5 capitalize">
                  {entry.type}
                </span>
              </DataTableCell>
              <DataTableCell className="hidden sm:table-cell capitalize text-[var(--color-mgmt-text-secondary)]">
                {entry.type}
              </DataTableCell>
              <DataTableCell>
                <StatusBadge variant={statusVariant(entry.status)}>{entry.status}</StatusBadge>
              </DataTableCell>
              <DataTableCell className="hidden md:table-cell text-[var(--color-mgmt-text-secondary)] tabular-nums">
                {entry.attempts}
              </DataTableCell>
              <DataTableCell className="hidden sm:table-cell text-[var(--color-mgmt-text-secondary)]">
                {formatDate(entry.updatedAt)}
              </DataTableCell>
              <DataTableCell>
                <a
                  href={`/admin/outbox/${entry.id}`}
                  className="text-xs text-[var(--color-mgmt-accent)] hover:underline"
                >
                  View
                </a>
              </DataTableCell>
            </DataTableRow>
          ))}
        </tbody>
      </DataTable>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[var(--color-mgmt-text-muted)]">
            Page {page} of {totalPages} · {total} entries
          </span>
          <div className="flex items-center gap-2">
            <MgmtButton variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </MgmtButton>
            <MgmtButton variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </MgmtButton>
          </div>
        </div>
      )}
    </div>
  );
}
