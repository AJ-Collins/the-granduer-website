"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
type DataTableProps = {
  children: ReactNode;
  /** Optional wrapper to make table scroll horizontally on mobile. */
  className?: string;
};

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)] overflow-hidden",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {children}
        </table>
      </div>
    </div>
  );
}

/* Table sub-components for consistent styling */
export function DataTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-[var(--color-mgmt-bg)] border-b border-[var(--color-mgmt-border)]">
      {children}
    </thead>
  );
}

export function DataTableHeaderCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-mgmt-text-muted)] whitespace-nowrap",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function DataTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn(
      "border-b border-[var(--color-mgmt-border-subtle)] last:border-b-0 hover:bg-[var(--color-mgmt-surface-hover)] transition-colors",
      className,
    )}>
      {children}
    </tr>
  );
}

export function DataTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-3.5 text-[var(--color-mgmt-text)] whitespace-nowrap", className)}>
      {children}
    </td>
  );
}

