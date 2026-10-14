"use client";

import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import {
  IconLightning,
  IconChevronDown,
  IconSearch,
  IconHelpCircle,
  IconLightbulb,
  IconTerminal,
  IconRadio,
  IconMenu,
} from "./icons";
import { MgmtProfileDropdown, type ProfileUser } from "./mgmt-profile-dropdown";
import { MgmtNotificationsDropdown } from "./notifications/mgmt-notifications-dropdown";

type MgmtTopNavProps = {
  orgName?: string;
  orgBadge?: string;
  projectName?: string;
  branchName?: string;
  branchBadge?: string;
  user?: ProfileUser;
  onLogout?: () => void;
  onMobileMenuToggle?: () => void;
  accountHref?: string;
  actions?: ReactNode;
};

export function MgmtTopNav({
  orgName = "AJ-Collins's Org",
  orgBadge = "FREE",
  projectName = "app-backend",
  branchName = "main",
  branchBadge = "PRODUCTION",
  user,
  onLogout,
  onMobileMenuToggle,
  accountHref = "/admin/settings",
  actions,
}: MgmtTopNavProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Ctrl + K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setConnectModalOpen(false);
        setHelpModalOpen(false);
        setFeedbackOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[var(--color-mgmt-surface)] border-b border-[var(--color-mgmt-border-subtle)] px-3 sm:px-4 flex items-center justify-between text-sm transition-colors duration-150">
      {/* ─── Left: Brand & Hierarchy Breadcrumb ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        {/* Mobile menu trigger */}
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

        {/* Brand Lightning Logo */}
        <a
          href="/admin/dashboard"
          className="flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-mgmt-accent)] hover:opacity-85 transition-opacity shrink-0"
          title="D'Grandeur Platform"
        >
          <IconLightning size={20} className="fill-[var(--color-mgmt-accent)] text-[var(--color-mgmt-accent)]" />
        </a>

        {/* Breadcrumb Group 1: Org */}
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

        <span className="hidden xs:inline text-[var(--color-mgmt-text-muted)] select-none">/</span>

        {/* Breadcrumb Group 2: Project / App */}
        <div className="flex items-center gap-1 hover:bg-[var(--color-mgmt-surface-hover)] px-2 py-1 rounded-md transition-colors cursor-pointer group">
          <span className="font-medium text-[var(--color-mgmt-text)] text-[13px] truncate max-w-[90px] sm:max-w-none">
            {projectName}
          </span>
          <IconChevronDown size={13} className="text-[var(--color-mgmt-text-muted)] group-hover:text-[var(--color-mgmt-text)] transition-colors shrink-0" />
        </div>

        <span className="hidden sm:inline text-[var(--color-mgmt-text-muted)] select-none">/</span>

        {/* Breadcrumb Group 3: Branch / Environment */}
        <div className="hidden sm:flex items-center gap-1.5 hover:bg-[var(--color-mgmt-surface-hover)] px-2 py-1 rounded-md transition-colors cursor-pointer group">
          <span className="text-[13px] text-[var(--color-mgmt-text-secondary)] group-hover:text-[var(--color-mgmt-text)]">
            {branchName}
          </span>
          {branchBadge && (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-500 border border-amber-500/20">
              {branchBadge}
            </span>
          )}
        </div>

        {/* Connect Action Button */}
        <button
          type="button"
          onClick={() => setConnectModalOpen(true)}
          className="hidden md:inline-flex items-center gap-1.5 ml-1 px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors cursor-pointer shadow-xs"
        >
          <IconTerminal size={13} className="text-[var(--color-mgmt-accent)]" />
          <span>Connect</span>
        </button>

        {actions}
      </div>

      {/* ─── Right: Actions, Search, Utilities, Profile ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Feedback Link */}
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="hidden md:inline-block text-xs font-medium text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)] px-2.5 py-1.5 rounded-md hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
        >
          Feedback
        </button>

        {/* Search Bar Pill */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full",
            "bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)]",
            "text-xs text-[var(--color-mgmt-text-muted)] hover:border-[var(--color-mgmt-border)] hover:text-[var(--color-mgmt-text-secondary)]",
            "transition-all duration-150 w-32 sm:w-44 md:w-52 cursor-pointer shadow-xs",
          )}
        >
          <IconSearch size={14} className="shrink-0" />
          <span className="flex-1 text-left truncate">Search...</span>
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-muted)]">
            Ctrl K
          </kbd>
        </button>

        {/* Utility Icon Buttons (Circle Outline like reference) */}
        <div className="hidden lg:flex items-center gap-1 text-[var(--color-mgmt-text-secondary)]">
          {/* Help Button */}
          <button
            type="button"
            onClick={() => setHelpModalOpen(true)}
            aria-label="Help and Documentation"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconHelpCircle size={16} />
          </button>

          {/* Lightbulb Tips */}
          <button
            type="button"
            onClick={() => alert("Tip: You can press Ctrl+K anywhere to trigger the quick search command palette.")}
            aria-label="Tips & Inspirations"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconLightbulb size={16} />
          </button>

          {/* Docs / Console */}
          <button
            type="button"
            onClick={() => setConnectModalOpen(true)}
            aria-label="Developer Console"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconTerminal size={15} />
          </button>

          {/* Status / Activity Radar */}
          <button
            type="button"
            onClick={() => alert("Platform Status: All services operational (100% uptime over 30d).")}
            aria-label="System Status"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center relative transition-colors"
          >
            <IconRadio size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-[var(--color-mgmt-surface)]" />
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="flex items-center">
          <MgmtNotificationsDropdown />
        </div>

        {/* Profile Dropdown */}
        <div className="pl-1">
          <MgmtProfileDropdown
            user={user}
            onLogout={onLogout}
            accountHref={accountHref}
          />
        </div>
      </div>

      {/* ─── Search Modal ─── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)] gap-2">
              <IconSearch size={18} className="text-[var(--color-mgmt-text-muted)]" />
              <input
                type="text"
                autoFocus
                placeholder="Search resources, users, bookings, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[var(--color-mgmt-text)] placeholder-[var(--color-mgmt-text-muted)] text-sm focus:outline-none"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-muted)]">
                ESC
              </kbd>
            </div>
            <div className="p-3 text-xs text-[var(--color-mgmt-text-muted)] space-y-2">
              <p className="px-2 font-medium uppercase tracking-wider text-[10px]">Quick Navigation</p>
              <div className="space-y-1">
                <a
                  href="/admin/dashboard"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
                >
                  <span>Dashboard Overview</span>
                  <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">Admin</span>
                </a>
                <a
                  href="/admin/users"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
                >
                  <span>User Accounts</span>
                  <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">Users</span>
                </a>
                <a
                  href="/admin/roles"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
                >
                  <span>Role &amp; Permissions Management</span>
                  <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">Security</span>
                </a>
                <a
                  href="/cms/dashboard"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
                >
                  <span>CMS Studio</span>
                  <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">Content</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Connect Modal ─── */}
      {connectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconTerminal size={18} className="text-[var(--color-mgmt-accent)]" />
                <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">
                  Connect to Database &amp; Services
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConnectModalOpen(false)}
                className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[var(--color-mgmt-text-muted)]">
              Use these connection parameters or CLI strings to connect directly to the operational database instance:
            </p>
            <div className="bg-[var(--color-mgmt-bg)] p-3 rounded-lg border border-[var(--color-mgmt-border)] font-mono text-xs text-[var(--color-mgmt-accent)] overflow-x-auto">
              <code>psql &quot;postgresql://postgres:postgres@localhost:5432/dgrandeur?sslmode=disable&quot;</code>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setConnectModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg bg-[var(--color-mgmt-accent)] text-black font-semibold hover:bg-[var(--color-mgmt-accent-hover)] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Feedback Modal ─── */}
      {feedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">
                Send Product Feedback
              </h3>
              <button
                type="button"
                onClick={() => setFeedbackOpen(false)}
                className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
              >
                ✕
              </button>
            </div>
            <textarea
              rows={4}
              placeholder="What can we improve in the management console?"
              className="w-full p-3 rounded-lg border border-[var(--color-mgmt-input-border)] bg-[var(--color-mgmt-input-bg)] text-[var(--color-mgmt-text)] text-sm focus:outline-none focus:border-[var(--color-mgmt-accent)]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFeedbackOpen(false)}
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Thank you for your feedback!");
                  setFeedbackOpen(false);
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-medium"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Help Modal ─── */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">
                Help &amp; Documentation
              </h3>
              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-mgmt-text-secondary)]">
              <p>• <strong>Dashboard:</strong> Real-time overview of users, bookings, and inquiries.</p>
              <p>• <strong>Theme Switching:</strong> Click your profile avatar on the top right to switch between System, Dark, and Light themes.</p>
              <p>• <strong>Keyboard Shortcut:</strong> Press Ctrl+K anytime for fast search and navigation.</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
