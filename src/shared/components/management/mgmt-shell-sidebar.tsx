"use client";

import { cn } from "@/shared/lib/cn";
import { IconLogOut } from "./icons";
import type { NavGroup } from "./mgmt-nav-types";

export function MgmtShellSidebar({
  title,
  groups,
  basePath,
  currentPath,
  onNavigate,
  onLogout,
}: {
  title: string;
  groups: NavGroup[];
  basePath: string;
  currentPath: string;
  onNavigate: () => void;
  onLogout: () => void;
}) {
  function isActive(href: string) {
    const full = `${basePath}${href}`;
    if (href === "/dashboard") {
      return currentPath === full || currentPath === basePath || currentPath === `${basePath}/`;
    }
    return currentPath === full || currentPath.startsWith(`${full}/`);
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-[240px] sm:w-[260px] bg-[var(--color-mgmt-sidebar)] border-r border-[var(--color-mgmt-border-subtle)]",
        "font-[var(--font-grotesk)] text-sm transition-colors duration-150",
      )}
    >
      <div className="flex items-center gap-2 px-5 h-12 border-b border-[var(--color-mgmt-border-subtle)] shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mgmt-text-muted)]">
          {title}
        </span>
      </div>

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
                      onClick={onNavigate}
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

      <div className="p-3 border-t border-[var(--color-mgmt-border-subtle)]">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-[13px] text-[var(--color-mgmt-text-secondary)] hover:bg-[var(--color-mgmt-sidebar-hover)] hover:text-[var(--color-mgmt-text)] transition-colors duration-150"
        >
          <IconLogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
