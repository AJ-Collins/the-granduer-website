"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
type SectionCardProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Remove internal padding (useful when children handle their own padding, e.g., tables). */
  noPadding?: boolean;
};

export function SectionCard({ title, description, actions, children, className, noPadding }: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)]",
        className,
      )}
    >
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 py-4 border-b border-[var(--color-mgmt-border-subtle)]">
          <div className="min-w-0">
            {title && (
              <h2 className="text-sm font-semibold text-[var(--color-mgmt-text)]">{title}</h2>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-[var(--color-mgmt-text-muted)]">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-4 sm:p-5"}>
        {children}
      </div>
    </div>
  );
}

