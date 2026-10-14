import type { BarChartItem, CategoryBreakdownItem } from "@/shared/types/analytics";

export function toCmsDashboard(
  counts: {
    packages: number;
    events: number;
    contentPages: number;
    testimonials: number;
    galleryImages: number;
    faqs: number;
  },
  tierBreakdown: CategoryBreakdownItem[],
) {
  return {
    packagesCount: counts.packages,
    eventsCount: counts.events,
    contentPagesCount: counts.contentPages,
    testimonialsCount: counts.testimonials,
    galleryImagesCount: counts.galleryImages,
    faqsCount: counts.faqs,
    tierBreakdown,
    catalogueDistribution: [
      {
        id: "gallery",
        label: "Gallery Photographs",
        value: counts.galleryImages,
        formattedValue: `${counts.galleryImages} items`,
      },
      {
        id: "faqs",
        label: "Frequently Asked Questions",
        value: counts.faqs,
        formattedValue: `${counts.faqs} entries`,
      },
      {
        id: "testimonials",
        label: "Client Testimonials",
        value: counts.testimonials,
        formattedValue: `${counts.testimonials} stories`,
      },
      {
        id: "pages",
        label: "Editorial Landing Pages",
        value: counts.contentPages,
        formattedValue: `${counts.contentPages} pages`,
      },
    ] as BarChartItem[],
    isSampleData: false as const,
  };
}
