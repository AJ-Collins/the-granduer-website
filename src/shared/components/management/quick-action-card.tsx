"use client";

import type { ReactNode } from "react";

export function QuickActionCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-3 p-3 rounded-lg border border-[var(--color-mgmt-border-subtle)] hover:border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors group no-underline"
    >
      <span className="shrink-0 mt-0.5 p-1.5 rounded-md bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text-muted)] group-hover:text-[var(--color-mgmt-accent)] transition-colors [&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-mgmt-text)] leading-tight">{title}</p>
        <p className="text-xs text-[var(--color-mgmt-text-muted)] mt-0.5">{description}</p>
      </div>
    </a>
  );
}
