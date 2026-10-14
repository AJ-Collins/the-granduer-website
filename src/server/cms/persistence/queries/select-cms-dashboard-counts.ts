import { db } from "../../../db/client";

export async function selectCmsDashboardCounts() {
  const [packages, events, contentPages, testimonials, galleryImages, faqs] =
    await Promise.all([
      db.package.count(),
      db.eventType.count(),
      db.contentPage.count(),
      db.testimonial.count(),
      db.galleryImage.count(),
      db.faq.count(),
    ]);
  return { packages, events, contentPages, testimonials, galleryImages, faqs };
}
