import type { DashboardAnalyticsData } from "@/shared/types/analytics";

export const SAMPLE_ANALYTICS_DATA: DashboardAnalyticsData = {
  isSampleData: true,
  enquiriesTrend: [
    { date: "2026-05", label: "May", value: 12, secondaryValue: 8 },
    { date: "2026-06", label: "Jun", value: 18, secondaryValue: 14 },
    { date: "2026-07", label: "Jul", value: 27, secondaryValue: 22 },
    { date: "2026-08", label: "Aug", value: 34, secondaryValue: 28 },
    { date: "2026-09", label: "Sep", value: 42, secondaryValue: 35 },
    { date: "2026-10", label: "Oct", value: 58, secondaryValue: 46 },
  ],
  statusBreakdown: [
    { id: "new", label: "New / Unassigned", value: 24, percentage: 38, color: "#3ecf8e" },
    { id: "assigned", label: "Assigned", value: 18, percentage: 28, color: "#3b82f6" },
    { id: "contacted", label: "In Review / Contacted", value: 14, percentage: 22, color: "#f59e0b" },
    { id: "closed", label: "Closed / Converted", value: 8, percentage: 12, color: "#a1a1a1" },
  ],
  eventTypesBreakdown: [
    { id: "wedding", label: "Weddings & Receptions", value: 38, formattedValue: "38 enquiries", subLabel: "62% of bookings" },
    { id: "corporate", label: "Corporate Galas & Summits", value: 24, formattedValue: "24 enquiries", subLabel: "24% of bookings" },
    { id: "private", label: "Private Banquets & Soirées", value: 16, formattedValue: "16 enquiries", subLabel: "14% of bookings" },
    { id: "cultural", label: "Concerts & Exhibitions", value: 9, formattedValue: "9 enquiries", subLabel: "8% of bookings" },
  ],
  recentActivity: [
    { id: "act-1", action: "New Booking Enquiry", actor: "Eleanor Vance", target: "Grand Ballroom (Wedding)", timestamp: "12 minutes ago", status: "success" },
    { id: "act-2", action: "Package Published", actor: "AJ-Collins (Admin)", target: "Signature Royal Banquet 2026", timestamp: "1 hour ago", status: "info" },
    { id: "act-3", action: "User Role Updated", actor: "System Audit", target: "events.coordinator@dgrandeur.co.uk", timestamp: "3 hours ago", status: "warning" },
    { id: "act-4", action: "Enquiry Assigned", actor: "AJ-Collins", target: "Goldman Tech Gala Proposal", timestamp: "5 hours ago", status: "neutral" },
    { id: "act-5", action: "Security Login", actor: "admin@dgrandeur.co.uk", target: "Console IP 192.168.1.1", timestamp: "Yesterday", status: "success" },
  ],
};
