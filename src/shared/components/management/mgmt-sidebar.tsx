"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { IconMenu, IconX, IconLogOut } from "./icons";
import type { NavGroup, NavItem } from "./mgmt-nav-types";

type MgmtSidebarProps = {
  title: string;
  groups: NavGroup[];
  currentPath: string;
  basePath: string;
  onLogout: () => void;
  footer?: ReactNode;
};

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

