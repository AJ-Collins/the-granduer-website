"use client";

import type { RoleOption } from "./use-roles";

export function RoleSelectField({
  roles,
  selected,
  onToggle,
  error,
}: {
  roles: RoleOption[];
  selected: string[];
  onToggle: (key: string) => void;
  error?: string;
}) {
  if (roles.length === 0) {
    return <p className="text-sm text-[var(--color-mgmt-text-muted)] py-4">Loading roles…</p>;
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {roles.map((role) => {
          const isSelected = selected.includes(role.key);
          return (
            <button
              key={role.key}
              type="button"
              onClick={() => onToggle(role.key)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-mgmt-md)] border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "border-[var(--color-mgmt-accent)] bg-[var(--color-mgmt-accent)]/10 text-[var(--color-mgmt-accent)]"
                  : "border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text-secondary)] hover:border-[var(--color-mgmt-text-muted)]"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[var(--color-mgmt-accent)] border-[var(--color-mgmt-accent)] text-black"
                    : "border-[var(--color-mgmt-border)]"
                }`}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium">{role.label ?? role.key}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
