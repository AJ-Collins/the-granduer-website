import type { NotificationItem } from "./notification-types";

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
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
