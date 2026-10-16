"use client";

import { IconChevronDown, IconLightning, IconMenu, IconTerminal } from "../icons";

export function TopNavBrand({
  orgName,
  orgBadge,
  projectName,
  branchName,
  branchBadge,
  onConnect,
  onMobileMenuToggle,
  actions,
}: {
  orgName: string;
  orgBadge?: string;
  projectName: string;
  branchName: string;
  branchBadge?: string;
  onConnect: () => void;
  onMobileMenuToggle?: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
      {onMobileMenuToggle && (
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 -ml-1 text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          <IconMenu size={19} />
        </button>
      )}
      <a
        href="/admin/dashboard"
        className="flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-mgmt-accent)] hover:opacity-85 transition-opacity shrink-0"
        title="D'Grandeur Platform"
      >
        {/* <IconLightning size={20} className="fill-[var(--color-mgmt-accent)] text-[var(--color-mgmt-accent)]" /> */}
      </a>
      <div className="hidden xs:flex items-center gap-1.5 hover:bg-[var(--color-mgmt-surface-hover)] px-2 py-1 rounded-md transition-colors cursor-pointer group">
        <span className="font-medium text-[var(--color-mgmt-text)] text-[13px] tracking-tight truncate max-w-[120px] sm:max-w-none">
          {orgName}
        </span>
        {orgBadge && (
          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border border-[var(--color-mgmt-border)] text-[var(--color-mgmt-text-muted)] bg-[var(--color-mgmt-bg)]">
            {orgBadge}
          </span>
        )}
        <IconChevronDown size={13} className="text-[var(--color-mgmt-text-muted)] group-hover:text-[var(--color-mgmt-text)] transition-colors" />
      </div>
      <div className="flex items-center gap-1 hover:bg-[var(--color-mgmt-surface-hover)] px-2 py-1 rounded-md transition-colors cursor-pointer group">
        <span className="font-medium text-[var(--color-mgmt-text)] text-[13px] truncate max-w-[90px] sm:max-w-none">
          {projectName}
        </span>
        {/* <IconChevronDown size={13} className="text-[var(--color-mgmt-text-muted)] group-hover:text-[var(--color-mgmt-text)] transition-colors shrink-0" /> */}
      </div>
      {actions}
    </div>
  );
}
