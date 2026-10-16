import { z } from "zod";

export const analyticsEventSchema = z.object({
  eventName: z.enum([
    "book_viewing_click",
    "proposal_click",
    "whatsapp_click",
    "phone_click",
    "package_view",
    "event_page_view",
    "gallery_engagement",
    "brochure_download",
    "directions_click",
    "viewing_form_submit",
    "proposal_form_submit",
  ]),
  path: z.string().max(500),
  source: z.string().max(120).optional(),
  medium: z.string().max(120).optional(),
  campaign: z.string().max(120).optional(),
  enquiryId: z.string().min(1).max(64).optional(),
});

export type AnalyticsEventBody = z.infer<typeof analyticsEventSchema>;
export type AnalyticsEventName = AnalyticsEventBody["eventName"];
