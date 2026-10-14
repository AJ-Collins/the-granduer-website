"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
type StatusBadgeProps = {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: ReactNode;
};

const BADGE_STYLES = {
  default: "bg-[var(--color-mgmt-text-muted)]/15 text-[var(--color-mgmt-text-secondary)]",
  success: "bg-[var(--color-mgmt-accent)]/15 text-[var(--color-mgmt-accent)]",
  warning: "bg-[var(--color-mgmt-warning)]/15 text-[var(--color-mgmt-warning)]",
  danger: "bg-[var(--color-mgmt-danger)]/15 text-[var(--color-mgmt-danger)]",
  info: "bg-[var(--color-mgmt-info)]/15 text-[var(--color-mgmt-info)]",
};

export function StatusBadge({ variant = "default", children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full whitespace-nowrap",
        BADGE_STYLES[variant],
      )}
    >
      {children}
    </span>
  );
}

