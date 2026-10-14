"use client";

import type { ReactNode } from "react";
type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <span className="mb-4 p-3 rounded-full bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text-muted)] [&>svg]:w-8 [&>svg]:h-8">
          {icon}
        </span>
      )}
      <h3 className="text-base font-medium text-[var(--color-mgmt-text)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-mgmt-text-muted)] max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

