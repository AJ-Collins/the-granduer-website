"use client";

import { StatusBadge } from "./status-badge";

export function StatusRow({
  label,
  status,
  variant,
}: {
  label: string;
  status: string;
  variant: "success" | "warning" | "danger";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-mgmt-text)]">{label}</span>
      <StatusBadge variant={variant}>{status}</StatusBadge>
    </div>
  );
}
