"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/shared/lib/cn";
import {
  IconBell,
  IconCheck,
  IconInbox,
  IconPackage,
  IconShield,
  IconActivity,
  IconX,
} from "../icons";
import { useToast } from "../toast/toast-context";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "enquiry" | "package" | "security" | "system";
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Viewing Enquiry",
    description: "Eleanor Vance submitted a proposal for Luxury Wedding & Gala.",
    timestamp: "12m ago",
    read: false,
    type: "enquiry",
  },
  {
    id: "notif-2",
    title: "Package Tier Updated",
    description: "Signature Royal Banquet 2026 was published to public catalogue.",
    timestamp: "1h ago",
    read: false,
    type: "package",
  },
  {
    id: "notif-3",
    title: "Security Audit Log",
    description: "Superadmin session established from IP 192.168.1.1.",
    timestamp: "4h ago",
    read: false,
    type: "security",
  },
  {
    id: "notif-4",
    title: "System Health Backup",
    description: "Automated snapshot completed. Read replicas 100% operational.",
    timestamp: "Yesterday",
    read: true,
    type: "system",
  },
];

export function MgmtNotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  }

  function toggleRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  }

  function clearAll() {
    setNotifications([]);
    toast.info("Notification list cleared");
  }

  const displayedNotifications = notifications.filter((n) =>
    filter === "unread" ? !n.read : true,
  );

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      {/* Bell Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        id="mgmt-notifications-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative w-8 h-8 rounded-full border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] hover:text-[var(--color-mgmt-text)] text-[var(--color-mgmt-text-secondary)] flex items-center justify-center transition-colors cursor-pointer",
          isOpen && "bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]",
        )}
        title="Notifications"
      >
        <IconBell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="region"
          aria-label="Notifications"
          className={cn(
            "absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]",
            "border border-[var(--color-mgmt-border)] shadow-2xl z-50 overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right",
          )}
        >
          {/* Header */}
          <div className="p-3.5 border-b border-[var(--color-mgmt-border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mgmt-text)]">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-mgmt-accent)]/15 text-[var(--color-mgmt-accent)]">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[11px] text-[var(--color-mgmt-accent)] hover:underline font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-[var(--color-mgmt-border-subtle)] bg-[var(--color-mgmt-bg)] text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "flex-1 py-1.5 text-center font-medium transition-colors cursor-pointer",
                filter === "all"
                  ? "border-b-2 border-[var(--color-mgmt-accent)] text-[var(--color-mgmt-text)] bg-[var(--color-mgmt-surface)]"
                  : "text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)]",
              )}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "flex-1 py-1.5 text-center font-medium transition-colors cursor-pointer",
                filter === "unread"
                  ? "border-b-2 border-[var(--color-mgmt-accent)] text-[var(--color-mgmt-text)] bg-[var(--color-mgmt-surface)]"
                  : "text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)]",
              )}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notification Items List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[var(--color-mgmt-border-subtle)]">
            {displayedNotifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--color-mgmt-text-muted)]">
                No notifications to display
              </div>
            ) : (
              displayedNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => toggleRead(notif.id)}
                  className={cn(
                    "p-3.5 flex items-start gap-3 transition-colors cursor-pointer group",
                    notif.read
                      ? "hover:bg-[var(--color-mgmt-surface-hover)]/50 opacity-80"
                      : "bg-[var(--color-mgmt-surface-hover)]/30 hover:bg-[var(--color-mgmt-surface-hover)]",
                  )}
                >
                  {/* Type Icon */}
                  <span
                    className={cn(
                      "p-1.5 rounded-lg shrink-0 mt-0.5",
                      notif.type === "enquiry" && "bg-emerald-500/15 text-emerald-500",
                      notif.type === "package" && "bg-blue-500/15 text-blue-500",
                      notif.type === "security" && "bg-amber-500/15 text-amber-500",
                      notif.type === "system" && "bg-purple-500/15 text-purple-500",
                    )}
                  >
                    {notif.type === "enquiry" && <IconInbox size={14} />}
                    {notif.type === "package" && <IconPackage size={14} />}
                    {notif.type === "security" && <IconShield size={14} />}
                    {notif.type === "system" && <IconActivity size={14} />}
                  </span>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={cn(
                          "text-xs truncate",
                          notif.read
                            ? "font-medium text-[var(--color-mgmt-text)]"
                            : "font-semibold text-[var(--color-mgmt-text)]",
                        )}
                      >
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-[var(--color-mgmt-text-muted)] font-mono shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5 leading-snug line-clamp-2">
                      {notif.description}
                    </p>
                  </div>

                  {/* Read dot / toggle */}
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[var(--color-mgmt-accent)] shrink-0 mt-1" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-[var(--color-mgmt-bg)] border-t border-[var(--color-mgmt-border-subtle)] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] text-[var(--color-mgmt-text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
              >
                Clear all
              </button>
              <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">
                Press ESC to close
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
