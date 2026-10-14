"use client";

import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import {
  IconHelpCircle,
  IconLightbulb,
  IconSearch,
  IconTerminal,
} from "../icons";
import { MgmtProfileDropdown, type ProfileUser } from "../profile";
import { MgmtNotificationsDropdown } from "../notifications/mgmt-notifications-dropdown";
import { TopNavBrand } from "./top-nav-brand";
import { TopNavConnectModal } from "./top-nav-connect-modal";
import { TopNavFeedbackModal } from "./top-nav-feedback-modal";
import { TopNavHelpModal } from "./top-nav-help-modal";
import { TopNavSearchModal } from "./top-nav-search-modal";

export type MgmtTopNavProps = {
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
      <TopNavBrand
        orgName={orgName}
        orgBadge={orgBadge}
        projectName={projectName}
        branchName={branchName}
        branchBadge={branchBadge}
        onConnect={() => setConnectModalOpen(true)}
        onMobileMenuToggle={onMobileMenuToggle}
        actions={actions}
      />

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="hidden md:inline-block text-xs font-medium text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)] px-2.5 py-1.5 rounded-md hover:bg-[var(--color-mgmt-surface-hover)] transition-colors"
        >
          Feedback
        </button>

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

        <div className="hidden lg:flex items-center gap-1 text-[var(--color-mgmt-text-secondary)]">
          <button
            type="button"
            onClick={() => setHelpModalOpen(true)}
            aria-label="Help and Documentation"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconHelpCircle size={16} />
          </button>
          <button
            type="button"
            onClick={() => alert("Tip: You can press Ctrl+K anywhere to trigger the quick search command palette.")}
            aria-label="Tips & Inspirations"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconLightbulb size={16} />
          </button>
          <button
            type="button"
            onClick={() => setConnectModalOpen(true)}
            aria-label="Developer Console"
            className="w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] flex items-center justify-center transition-colors"
          >
            <IconTerminal size={15} />
          </button>
        </div>

        <div className="flex items-center">
          <MgmtNotificationsDropdown />
        </div>

        <div className="pl-1">
          <MgmtProfileDropdown user={user} onLogout={onLogout} accountHref={accountHref} />
        </div>
      </div>

      {searchOpen && (
        <TopNavSearchModal query={searchQuery} onQueryChange={setSearchQuery} onClose={() => setSearchOpen(false)} />
      )}
      {connectModalOpen && <TopNavConnectModal onClose={() => setConnectModalOpen(false)} />}
      {feedbackOpen && <TopNavFeedbackModal onClose={() => setFeedbackOpen(false)} />}
      {helpModalOpen && <TopNavHelpModal onClose={() => setHelpModalOpen(false)} />}
    </header>
  );
}
