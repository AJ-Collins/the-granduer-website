import type { CmsDashboardData } from "./get-cms-dashboard-stats";

export const SAMPLE_CMS_DATA: CmsDashboardData = {
  packagesCount: 4,
  eventsCount: 4,
  contentPagesCount: 6,
  testimonialsCount: 8,
  galleryImagesCount: 24,
  faqsCount: 12,
  tierBreakdown: [
    { id: "bespoke", label: "Bespoke", value: 1, percentage: 25, color: "#8b5cf6" },
    { id: "signature", label: "Signature", value: 1, percentage: 25, color: "#3ecf8e" },
    { id: "classic", label: "Classic", value: 1, percentage: 25, color: "#3b82f6" },
    { id: "essential", label: "Essential", value: 1, percentage: 25, color: "#f59e0b" },
  ],
  catalogueDistribution: [
    { id: "gallery", label: "Gallery Photographs", value: 24, formattedValue: "24 items", subLabel: "High-resolution curated media" },
    { id: "faqs", label: "Frequently Asked Questions", value: 12, formattedValue: "12 entries", subLabel: "Guest & client information" },
    { id: "testimonials", label: "Client Testimonials", value: 8, formattedValue: "8 stories", subLabel: "Verified reviews" },
    { id: "pages", label: "Editorial Landing Pages", value: 6, formattedValue: "6 pages", subLabel: "Rich content articles" },
  ],
  isSampleData: true,
};
