"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { IconMenu, IconX, IconLogOut, IconChevronRight, IconSearch } from "./icons";
export { MgmtShell } from "./mgmt-shell";
export { MgmtTopNav } from "./mgmt-top-nav";
export { MgmtProfileDropdown } from "./mgmt-profile-dropdown";
export { ThemeProvider, useTheme, ThemeScript } from "./theme-provider";
export type { ThemeMode } from "./theme-provider";
export type { ProfileUser } from "./mgmt-profile-dropdown";
export { ChartContainer, TrendChart, DonutChart, BarChart } from "./charts";
export { ToastProvider, useToast } from "./toast/toast-context";
export type { ToastType, ToastItem } from "./toast/toast-context";
export { MgmtNotificationsDropdown } from "./notifications/mgmt-notifications-dropdown";
export type { NotificationItem } from "./notifications/mgmt-notifications-dropdown";
export { Alert } from "./alert";
export type { AlertVariant } from "./alert";

/* ─── Types ─── */
export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  /** Optional badge text shown next to the label. */
  badge?: string;
};

type MgmtSidebarProps = {
  /** Title shown at top of sidebar (e.g. "Admin", "CMS Studio"). */
  title: string;
  /** Grouped navigation items. */
  groups: NavGroup[];
  /** Current pathname to derive active state. */
  currentPath: string;
  /** Prefix to prepend to all item hrefs (e.g. "/admin", "/cms"). */
  basePath: string;
  /** Logout handler. */
  onLogout: () => void;
  /** Optional React node displayed at the bottom of the sidebar (above logout). */
  footer?: ReactNode;
};

/* ─── Sidebar ─── */
export function MgmtSidebar({
  title,
  groups,
  currentPath,
  basePath,
  onLogout,
  footer,
}: MgmtSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Close on escape */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, handleKey]);

  /* Close on route change (click) */
  const close = () => setMobileOpen(false);

  function isActive(href: string) {
    const full = `${basePath}${href}`;
    if (href === "/dashboard") {
      return currentPath === full || currentPath === basePath || currentPath === `${basePath}/`;
    }
    return currentPath === full || currentPath.startsWith(`${full}/`);
  }

  const sidebar = (
    <aside
      className={cn(
        "flex flex-col h-full w-[260px] bg-[var(--color-mgmt-sidebar)] border-r border-[var(--color-mgmt-border-subtle)]",
        "font-[var(--font-grotesk)] text-sm",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 h-14 border-b border-[var(--color-mgmt-border-subtle)] shrink-0">
        <div className="w-6 h-6 rounded-[var(--radius-mgmt-sm)] bg-[var(--color-mgmt-accent)] flex items-center justify-center text-xs font-semibold text-black">
          {title.charAt(0)}
        </div>
        <span className="font-semibold text-[var(--color-mgmt-text)] truncate">{title}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3" aria-label={`${title} navigation`}>
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-5" : ""}>
            {group.label && (
              <div className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--color-mgmt-text-muted)]">
                {group.label}
              </div>
            )}
            <ul className="space-y-0.5" role="list">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={`${basePath}${item.href}`}
                      onClick={close}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-mgmt-md)] transition-colors duration-150",
                        active
                          ? "bg-[var(--color-mgmt-sidebar-active)] text-[var(--color-mgmt-text)]"
                          : "text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)]",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="shrink-0 [&>svg]:w-[18px] [&>svg]:h-[18px]">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[11px] font-medium bg-[var(--color-mgmt-accent)]/15 text-[var(--color-mgmt-accent)] px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="px-3 pb-2">{footer}</div>
      )}

      {/* Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-[var(--color-mgmt-border-subtle)]">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)] transition-colors duration-150"
        >
          <IconLogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile header bar */}
      <header className="lg:hidden flex items-center gap-3 px-4 h-14 bg-[var(--color-mgmt-sidebar)] border-b border-[var(--color-mgmt-border-subtle)] sticky top-0 z-40">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-[var(--radius-mgmt-sm)] text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)] transition-colors"
          aria-label="Open navigation"
        >
          <IconMenu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[var(--radius-mgmt-sm)] bg-[var(--color-mgmt-accent)] flex items-center justify-center text-xs font-semibold text-black">
            {title.charAt(0)}
          </div>
          <span className="font-semibold text-[var(--color-mgmt-text)] text-sm">{title}</span>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[var(--color-mgmt-overlay)] animate-[fadeIn_150ms_ease]"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 z-10 p-1 rounded-[var(--radius-mgmt-sm)] text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] transition-colors"
          aria-label="Close navigation"
        >
          <IconX size={18} />
        </button>
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-[260px]">
        {sidebar}
      </div>
    </>
  );
}

/* ─── Page Header ─── */
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

/* ─── Stat Card ─── */
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

/* ─── Status Badge ─── */
type StatusBadgeProps = {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: ReactNode;
};

const BADGE_STYLES = {
  default: "bg-[var(--color-mgmt-text-muted)]/15 text-[var(--color-mgmt-text-secondary)]",
  success: "bg-[var(--color-mgmt-accent)]/15 text-[var(--color-mgmt-accent)]",
  warning: "bg-[var(--color-mgmt-warning)]/15 text-[var(--color-mgmt-warning)]",
  danger: "bg-[var(--color-mgmt-danger)]/15 text-[var(--color-mgmt-danger)]",
  info: "bg-[var(--color-mgmt-info)]/15 text-[var(--color-mgmt-info)]",
};

export function StatusBadge({ variant = "default", children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full whitespace-nowrap",
        BADGE_STYLES[variant],
      )}
    >
      {children}
    </span>
  );
}

/* ─── Data Table ─── */
type DataTableProps = {
  children: ReactNode;
  /** Optional wrapper to make table scroll horizontally on mobile. */
  className?: string;
};

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)] overflow-hidden",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {children}
        </table>
      </div>
    </div>
  );
}

/* Table sub-components for consistent styling */
export function DataTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-[var(--color-mgmt-bg)] border-b border-[var(--color-mgmt-border)]">
      {children}
    </thead>
  );
}

export function DataTableHeaderCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-mgmt-text-muted)] whitespace-nowrap",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function DataTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn(
      "border-b border-[var(--color-mgmt-border-subtle)] last:border-b-0 hover:bg-[var(--color-mgmt-surface-hover)] transition-colors",
      className,
    )}>
      {children}
    </tr>
  );
}

export function DataTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-3.5 text-[var(--color-mgmt-text)] whitespace-nowrap", className)}>
      {children}
    </td>
  );
}

/* ─── Empty State ─── */
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

/* ─── Management Buttons ─── */
type MgmtButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
  href?: string;
  className?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

const BTN_VARIANTS = {
  primary: "bg-[var(--color-mgmt-accent)] hover:bg-[var(--color-mgmt-accent-hover)] text-black font-medium",
  secondary: "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]",
  danger: "bg-[var(--color-mgmt-danger)] hover:bg-[var(--color-mgmt-danger-hover)] text-white font-medium",
  ghost: "hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)]",
};

const BTN_SIZES = {
  sm: "px-3 py-1.5 text-[13px]",
  md: "px-4 py-2 text-sm",
};

export function MgmtButton({ variant = "secondary", size = "md", children, href, className, ...rest }: MgmtButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-mgmt-md)] transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
    BTN_VARIANTS[variant],
    BTN_SIZES[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

/* ─── Search Input ─── */
type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function SearchInput({ placeholder = "Search…", value, onChange, className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <IconSearch
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] pointer-events-none"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] focus:ring-1 focus:ring-[var(--color-mgmt-input-focus)]/30 transition-colors"
      />
    </div>
  );
}

/* ─── Section Card ─── */
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

/* ─── Loading Skeleton ─── */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-mgmt-border-subtle)] rounded-[var(--radius-mgmt-sm)]",
        className,
      )}
    />
  );
}

/* ─── CSS animation keyframe for fade-in (use in tailwind) ─── */
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// This is handled by Tailwind's animate-[fadeIn_150ms_ease] above.
