"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast/toast-context";
import { MgmtTopNav } from "./mgmt-top-nav";
import { IconX, IconLogOut } from "./icons";
import type { NavGroup } from "./index";
import type { ProfileUser } from "./mgmt-profile-dropdown";

type MgmtShellProps = {
  title: string;
  groups: NavGroup[];
  basePath: string;
  user?: ProfileUser;
  orgName?: string;
  orgBadge?: string;
  projectName?: string;
  branchName?: string;
  branchBadge?: string;
  onLogout?: () => void;
  children: ReactNode;
};

export function MgmtShell({
  title,
  groups,
  basePath,
  user,
  orgName,
  orgBadge,
  projectName,
  branchName,
  branchBadge,
  onLogout,
  children,
}: MgmtShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on Escape key
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

  const closeMobile = () => setMobileOpen(false);

  function isActive(href: string) {
    const full = `${basePath}${href}`;
    if (href === "/dashboard") {
      return pathname === full || pathname === basePath || pathname === `${basePath}/`;
    }
    return pathname === full || pathname.startsWith(`${full}/`);
  }

  function handleDefaultLogout() {
    if (onLogout) {
      onLogout();
    } else {
      fetch("/api/auth/logout", { method: "POST" }).then(() => {
        window.location.href = `${basePath}/login`;
      });
    }
  }

  const sidebarContent = (
    <aside
      className={cn(
        "flex flex-col h-full w-[240px] sm:w-[260px] bg-[var(--color-mgmt-sidebar)] border-r border-[var(--color-mgmt-border-subtle)]",
        "font-[var(--font-grotesk)] text-sm transition-colors duration-150",
      )}
    >
      {/* Sidebar Section Title */}
      <div className="flex items-center gap-2 px-5 h-12 border-b border-[var(--color-mgmt-border-subtle)] shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mgmt-text-muted)]">
          {title}
        </span>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4" aria-label={`${title} navigation`}>
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-mgmt-text-muted)]">
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
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150",
                        active
                          ? "bg-[var(--color-mgmt-sidebar-active)] text-[var(--color-mgmt-text)]"
                          : "text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)]",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4 text-[var(--color-mgmt-text-muted)]">
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] font-semibold bg-[var(--color-mgmt-accent)]/15 text-[var(--color-mgmt-accent)] px-1.5 py-0.2 rounded-full">
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

      {/* Logout in footer */}
      <div className="p-3 border-t border-[var(--color-mgmt-border-subtle)]">
        <button
          type="button"
          onClick={handleDefaultLogout}
          className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-[13px] text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)] transition-colors duration-150"
        >
          <IconLogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text)] transition-colors duration-150">
          {/* Full-width Top Navigation */}
          <MgmtTopNav
            orgName={orgName}
            orgBadge={orgBadge}
            projectName={projectName}
            branchName={branchName}
            branchBadge={branchBadge}
            user={user}
            onLogout={handleDefaultLogout}
            onMobileMenuToggle={() => setMobileOpen(true)}
            accountHref={`${basePath}/settings`}
          />

          {/* Mobile Navigation Drawer */}
          {mobileOpen && (
            <div
              className="lg:hidden fixed inset-0 z-50 bg-[var(--color-mgmt-overlay)] backdrop-blur-xs animate-in fade-in duration-150"
              onClick={closeMobile}
              aria-hidden="true"
            />
          )}
          <div
            className={cn(
              "lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-200 ease-out",
              mobileOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <button
              type="button"
              onClick={closeMobile}
              className="absolute top-3 right-3 z-10 p-1 rounded-md text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] transition-colors"
              aria-label="Close navigation"
            >
              <IconX size={18} />
            </button>
            {sidebarContent}
          </div>

          {/* Desktop Fixed Sidebar (positioned below top navigation) */}
          <div className="hidden lg:block fixed top-14 left-0 bottom-0 z-30 w-[260px]">
            {sidebarContent}
          </div>

          {/* Main Content Area */}
          <div className="lg:pl-[260px] min-h-[calc(100vh-56px)]">
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
