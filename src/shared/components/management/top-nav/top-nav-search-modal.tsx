"use client";

import { IconSearch } from "../icons";

const QUICK_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard Overview", tag: "Admin" },
  { href: "/admin/users", label: "User Accounts", tag: "Users" },
  { href: "/admin/roles", label: "Role & Permissions Management", tag: "Security" },
  { href: "/cms/dashboard", label: "CMS Studio", tag: "Content" },
];

export function TopNavSearchModal({
  query,
  onQueryChange,
  onClose,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)] gap-2">
          <IconSearch size={18} className="text-[var(--color-mgmt-text-muted)]" />
          <input
            type="text"
            autoFocus
            placeholder="Search resources, users, bookings, packages..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-transparent text-[var(--color-mgmt-text)] placeholder-[var(--color-mgmt-text-muted)] text-sm focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-muted)]">
            ESC
          </kbd>
        </div>
        <div className="p-3 text-xs text-[var(--color-mgmt-text-muted)] space-y-2">
          <p className="px-2 font-medium uppercase tracking-wider text-[10px]">Quick Navigation</p>
          <div className="space-y-1">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
              >
                <span>{l.label}</span>
                <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">{l.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
