"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  /** Optional trend text, e.g., "+5 this week". */
  trend?: string;
  /** Optional link to navigate on click. */
  href?: string;
};

export function StatCard({ label, value, icon, trend, href }: StatCardProps) {
  const content = (
    <div
      className={cn(
        "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)] p-4 sm:p-5",
        "transition-colors duration-150",
        href && "hover:border-[var(--color-mgmt-border)]",
        href && "hover:bg-[var(--color-mgmt-surface-hover)] cursor-pointer",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-[var(--color-mgmt-text-muted)] mb-1.5 truncate">{label}</p>
          <p className="text-2xl sm:text-3xl font-semibold text-[var(--color-mgmt-text)] tracking-tight tabular-nums">
            {value}
          </p>
          {trend && (
            <p className="mt-1.5 text-xs text-[var(--color-mgmt-accent)]">{trend}</p>
          )}
        </div>
        {icon && (
          <span className="shrink-0 p-2 rounded-[var(--radius-mgmt-md)] bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text-muted)] [&>svg]:w-5 [&>svg]:h-5">
            {icon}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block no-underline">{content}</a>;
  }
  return content;
}

