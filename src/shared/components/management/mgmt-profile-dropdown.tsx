"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/shared/lib/cn";
import { useTheme, type ThemeMode } from "./theme-provider";
import {
  IconUser,
  IconFlask,
  IconFileText,
  IconChevronRight,
  IconLogOut,
} from "./icons";

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
  const [clientTz, setClientTz] = useState("Auto (Africa/Nairobi)");
  const [proModalOpen, setProModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();

  // Detect client timezone on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setClientTz(`Auto (${tz})`);
      }
    } catch {
      // Keep default
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  const displayName = user.name || user.email?.split("@")[0] || "AJ-Collins";
  const displayEmail = user.email || "kiprocolloaj254@gmail.com";
  const initials = displayName
    .split(/[\s-_]+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "AJ";

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      {/* Profile Trigger Button */}
      <button
        ref={buttonRef}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mgmt-profile-trigger"
          className={cn(
            "absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]",
            "border border-[var(--color-mgmt-border)] shadow-xl z-50",
            "animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right overflow-hidden",
          )}
        >
          {/* Section 1: User Identity */}
          <div className="px-4 py-3.5 border-b border-[var(--color-mgmt-border-subtle)]">
            <p className="text-sm font-semibold text-[var(--color-mgmt-text)] truncate leading-snug">
              {displayName}
            </p>
            <p className="text-xs text-[var(--color-mgmt-text-muted)] truncate mt-0.5">
              {displayEmail}
            </p>
          </div>

          {/* Section 2: Account Links */}
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

          {/* Section 3: Theme Options (Reference Matched) */}
          <div className="px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)]">
            <p className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-2">
              Theme
            </p>
            <div className="space-y-1 pl-4" role="radiogroup" aria-label="Theme selection">
              {(["system", "dark", "light"] as const).map((mode) => {
                const isSelected = theme === mode;
                const label = mode.charAt(0).toUpperCase() + mode.slice(1);
                return (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setTheme(mode);
                    }}
                    className={cn(
                      "flex items-center gap-2.5 w-full text-left py-1 text-sm rounded transition-colors group",
                      isSelected
                        ? "text-[var(--color-mgmt-text)] font-medium"
                        : "text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)]",
                    )}
                  >
                    <span className="w-3 flex items-center justify-center shrink-0">
                      {isSelected ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mgmt-text)] shrink-0" />
                      ) : null}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Timezone */}
          <div className="py-1.5 border-b border-[var(--color-mgmt-border-subtle)]">
            <div className="flex items-center justify-between px-4 py-2 text-sm text-[var(--color-mgmt-text)] hover:bg-[var(--color-mgmt-surface-hover)] cursor-default transition-colors">
              <div>
                <p className="text-sm font-normal text-[var(--color-mgmt-text)] leading-tight">Timezone</p>
                <p className="text-xs text-[var(--color-mgmt-text-muted)] mt-0.5">{clientTz}</p>
              </div>
              <IconChevronRight size={14} className="text-[var(--color-mgmt-text-muted)]" />
            </div>
          </div>

          {/* Section 5: Upgrade to Pro Button */}
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

          {/* Section 6: Sign Out */}
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

      {/* Pro Plan Modal */}
      {proModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--color-mgmt-text)]">
                Upgrade to Pro
              </h3>
              <button
                type="button"
                onClick={() => setProModalOpen(false)}
                className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--color-mgmt-text-secondary)]">
              Unlock dedicated compute replicas, automated daily audit logs, custom SSL domains, and priority 24/7 SLA support for D&apos;Grandeur Event Centre.
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Pro plan inquiry submitted!");
                  setProModalOpen(false);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-medium transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
