"use client";

import { cn } from "@/shared/lib/cn";
import { IconActivity, IconInbox, IconPackage, IconShield } from "../icons";
import type { NotificationItem } from "./notification-types";

export function NotificationItemRow({ notif, onToggle }: { notif: NotificationItem; onToggle: (id: string) => void }) {
  return (
    <div
      onClick={() => onToggle(notif.id)}
      className={cn(
        "p-3.5 flex items-start gap-3 transition-colors cursor-pointer group",
        notif.read
          ? "hover:bg-[var(--color-mgmt-surface-hover)]/50 opacity-80"
          : "bg-[var(--color-mgmt-surface-hover)]/30 hover:bg-[var(--color-mgmt-surface-hover)]",
      )}
    >
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
          <span className="text-[10px] text-[var(--color-mgmt-text-muted)] font-mono shrink-0">{notif.timestamp}</span>
        </div>
        <p className="text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5 leading-snug line-clamp-2">
          {notif.description}
        </p>
      </div>
      {!notif.read && (
        <span className="w-2 h-2 rounded-full bg-[var(--color-mgmt-accent)] shrink-0 mt-1" />
      )}
    </div>
  );
}
