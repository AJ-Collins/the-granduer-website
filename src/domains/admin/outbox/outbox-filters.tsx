"use client";

import { useCallback } from "react";

const STATUS_OPTIONS = ["all", "pending", "sending", "sent", "failed"] as const;
const TYPE_OPTIONS = ["all", "email", "sms", "push"] as const;

type OutboxFiltersProps = {
  status: string;
  type: string;
  onStatusChange: (status: string) => void;
  onTypeChange: (type: string) => void;
};

const selectClasses =
  "px-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] focus:ring-1 focus:ring-[var(--color-mgmt-input-focus)]/30 transition-colors cursor-pointer";

export function OutboxFilters({ status, type, onStatusChange, onTypeChange }: OutboxFiltersProps) {
  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onStatusChange(e.target.value),
    [onStatusChange],
  );
  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onTypeChange(e.target.value),
    [onTypeChange],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="outbox-filter-status" className="text-xs font-medium text-[var(--color-mgmt-text-muted)] whitespace-nowrap">
          Status
        </label>
        <select
          id="outbox-filter-status"
          value={status}
          onChange={handleStatusChange}
          className={selectClasses}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="outbox-filter-type" className="text-xs font-medium text-[var(--color-mgmt-text-muted)] whitespace-nowrap">
          Type
        </label>
        <select
          id="outbox-filter-type"
          value={type}
          onChange={handleTypeChange}
          className={selectClasses}
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
