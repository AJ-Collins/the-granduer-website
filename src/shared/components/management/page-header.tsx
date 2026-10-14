"use client";

import type { ReactNode } from "react";
import { IconChevronRight } from "./icons";
type PageHeaderProps = {
  title: string;
  description?: string;
  /** Breadcrumb segments: [{label, href?}]. Last one is auto-bolded. */
  breadcrumbs?: { label: string; href?: string }[];
  /** Right-side actions (buttons, etc.). */
  actions?: ReactNode;
};

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="space-y-3 mb-6 sm:mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-[var(--color-mgmt-text-muted)]">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <IconChevronRight size={14} />}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-[var(--color-mgmt-text-secondary)] transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className={i === breadcrumbs.length - 1 ? "text-[var(--color-mgmt-text-secondary)]" : ""}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--color-mgmt-text)] tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-[var(--color-mgmt-text-muted)] max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}

