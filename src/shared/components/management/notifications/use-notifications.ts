import { useState } from "react";
import type { NotificationItem } from "./notification-types";
import { INITIAL_NOTIFICATIONS } from "./sample-notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = notifications.filter((n) => (filter === "unread" ? !n.read : true));

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  function clearAll() {
    setNotifications([]);
  }

  return { notifications, filter, setFilter, unreadCount, displayed, markAllAsRead, toggleRead, clearAll };
}
