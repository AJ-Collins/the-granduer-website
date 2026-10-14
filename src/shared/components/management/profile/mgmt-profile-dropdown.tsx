"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { useDismissOnOutside } from "../use-dismiss-on-outside";
import { IconChevronRight, IconFileText, IconFlask, IconLogOut, IconUser } from "../icons";
import { ProPlanModal } from "./pro-plan-modal";
import { ProfileThemeSelector } from "./profile-theme-selector";
import { useClientTimezone } from "./use-client-timezone";

export type ProfileUser = {
  name?: string | null;
  email?: string;
  avatarUrl?: string;
};

type MgmtProfileDropdownProps = {
  user?: ProfileUser;
  onLogout?: () => void;
  accountHref?: string;
};

export function MgmtProfileDropdown({
  user = {
    name: "AJ-Collins",
    email: "kiprocolloaj254@gmail.com",
  },
  onLogout,
  accountHref = "/admin/settings",
}: MgmtProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const clientTz = useClientTimezone();
  const { panelRef, triggerRef, handleEscape } = useDismissOnOutside<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );

  const displayName = user.name || user.email?.split("@")[0] || "AJ-Collins";
  const displayEmail = user.email || "kiprocolloaj254@gmail.com";
  const initials =
    displayName
      .split(/[\s-_]+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "AJ";

  return (
    <div className="relative inline-block text-left" onKeyDown={handleEscape}>
      <button
        ref={triggerRef}
        type="button"
        id="mgmt-profile-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative flex items-center justify-center w-8 h-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-mgmt-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-mgmt-bg)]",
          "hover:opacity-90 active:scale-95",
        )}
        title={`${displayName} (${displayEmail})`}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover border border-[var(--color-mgmt-border)]"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-950 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-1 ring-white/10">
            {initials}
          </div>
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mgmt-profile-trigger"
          className={cn(
            "absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]",
            "border border-[var(--color-mgmt-border)] shadow-xl z-50",
            "animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right overflow-hidden",
          )}
        >
          <div className="px-4 py-3.5 border-b border-[var(--color-mgmt-border-subtle)]">
            <p className="text-sm font-semibold text-[var(--color-mgmt-text)] truncate leading-snug">
              {displayName}
            </p>
            <p className="text-xs text-[var(--color-mgmt-text-muted)] truncate mt-0.5">{displayEmail}</p>
          </div>

          <div className="py-1.5 border-b border-[var(--color-mgmt-border-subtle)]">
            <a
              href={accountHref}
              onClick={() => setIsOpen(false)}
              role="menuitem"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
            >
              <IconUser size={16} className="text-[var(--color-mgmt-text-muted)] shrink-0" />
              <span>Account</span>
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                alert("Feature previews are enabled for your preview environment.");
              }}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
            >
              <IconFlask size={16} className="text-[var(--color-mgmt-text-muted)] shrink-0" />
              <span>Feature previews</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                window.open("https://github.com", "_blank");
              }}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
            >
              <IconFileText size={16} className="text-[var(--color-mgmt-text-muted)] shrink-0" />
              <span>Changelog</span>
            </button>
          </div>

          <ProfileThemeSelector />

          <div className="py-1.5 border-b border-[var(--color-mgmt-border-subtle)]">
            <div className="flex items-center justify-between px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] cursor-default transition-colors">
              <div>
                <p className="text-sm font-normal text-[var(--color-mgmt-text)] leading-tight">Timezone</p>
                <p className="text-xs text-[var(--color-mgmt-text-muted)] mt-0.5">{clientTz}</p>
              </div>
              <IconChevronRight size={14} className="text-[var(--color-mgmt-text-muted)]" />
            </div>
          </div>

          <div className="p-3 border-b border-[var(--color-mgmt-border-subtle)]">
            <button
              type="button"
              onClick={() => {
                setProModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Upgrade to Pro</span>
            </button>
          </div>

          <div className="py-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                if (onLogout) {
                  onLogout();
                } else {
                  fetch("/api/auth/logout", { method: "POST" }).then(() => {
                    window.location.href = "/admin/login";
                  });
                }
              }}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
            >
              <IconLogOut size={16} className="text-[var(--color-mgmt-text-muted)] shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}

      {proModalOpen && <ProPlanModal onClose={() => setProModalOpen(false)} />}
    </div>
  );
}
