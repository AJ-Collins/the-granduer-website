"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { IconBell } from "../icons";
import { useToast } from "../toast/toast-context";
import { useDismissOnOutside } from "../use-dismiss-on-outside";
import { NotificationItemRow } from "./notification-item";
import type { NotificationItem } from "./notification-types";
import { useNotifications } from "./use-notifications";

export type { NotificationItem };

export function MgmtNotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, filter, setFilter, unreadCount, displayed, markAllAsRead, toggleRead, clearAll } =
    useNotifications();
  const { panelRef, triggerRef, handleEscape } = useDismissOnOutside<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );
  const toast = useToast();

  return (
    <div className="relative inline-block text-left" onKeyDown={handleEscape}>
      <button
        ref={triggerRef}
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

      {isOpen && (
        <div
          ref={panelRef}
          role="region"
          aria-label="Notifications"
          className={cn(
            "absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]",
            "border border-[var(--color-mgmt-border)] shadow-2xl z-50 overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right",
          )}
        >
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
                  onClick={() => {
                    markAllAsRead();
                    toast.success("All notifications marked as read");
                  }}
                  className="text-[11px] text-[var(--color-mgmt-accent)] hover:underline font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

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

          <div className="max-h-80 overflow-y-auto divide-y divide-[var(--color-mgmt-border-subtle)]">
            {displayed.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--color-mgmt-text-muted)]">
                No notifications to display
              </div>
            ) : (
              displayed.map((notif) => (
                <NotificationItemRow key={notif.id} notif={notif} onToggle={toggleRead} />
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-2.5 bg-[var(--color-mgmt-bg)] border-t border-[var(--color-mgmt-border-subtle)] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  toast.info("Notification list cleared");
                }}
                className="text-[11px] text-[var(--color-mgmt-text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
              >
                Clear all
              </button>
              <span className="text-[10px] text-[var(--color-mgmt-text-muted)]">Press ESC to close</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
