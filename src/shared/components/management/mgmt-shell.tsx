"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast/toast-context";
import { MgmtTopNav } from "./top-nav";
import { IconX } from "./icons";
import type { NavGroup } from "./mgmt-nav-types";
import type { ProfileUser } from "./profile";
import { MgmtShellSidebar } from "./mgmt-shell-sidebar";

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

  const isLoginPage =
    pathname === "/login" ||
    pathname === `${basePath}/login` ||
    pathname.endsWith("/login");

  function handleDefaultLogout() {
    if (onLogout) {
      onLogout();
    } else {
      fetch("/api/auth/logout", { method: "POST" }).then(() => {
        window.location.href = `${basePath}/login`;
      });
    }
  }

  const sidebar = (
    <MgmtShellSidebar
      title={title}
      groups={groups}
      basePath={basePath}
      currentPath={pathname}
      onNavigate={closeMobile}
      onLogout={handleDefaultLogout}
    />
  );

  if (isLoginPage) {
    return (
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text)] transition-colors duration-150">
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
            {sidebar}
          </div>

          <div className="hidden lg:block fixed top-14 left-0 bottom-0 z-30 w-[260px]">
            {sidebar}
          </div>

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
