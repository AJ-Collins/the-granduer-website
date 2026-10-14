"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ChartContainerProps = {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "warning";
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

export function ChartContainer({
  title,
  description,
  badge,
  badgeVariant = "default",
  actions,
  children,
  className,
  footer,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-xl overflow-hidden transition-colors duration-150 flex flex-col justify-between",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-5 border-b border-[var(--color-mgmt-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[var(--color-mgmt-text)] tracking-tight">
              {title}
            </h3>
            {badge && (
              <span
                className={cn(
                  "text-[10px] font-medium uppercase px-2 py-0.5 rounded-full",
                  badgeVariant === "success" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                  badgeVariant === "warning" && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                  badgeVariant === "default" && "bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-muted)] border border-[var(--color-mgmt-border)]",
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-[var(--color-mgmt-text-muted)]">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Chart Canvas Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Optional Footer / Legend / Note */}
      {footer && (
        <div className="px-4 py-2.5 bg-[var(--color-mgmt-bg)] border-t border-[var(--color-mgmt-border-subtle)] text-xs text-[var(--color-mgmt-text-muted)]">
          {footer}
        </div>
      )}
    </div>
  );
}
