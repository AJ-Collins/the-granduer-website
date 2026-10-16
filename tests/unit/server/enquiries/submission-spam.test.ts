import { describe, expect, it } from "vitest";
import { detectSubmissionSpam } from "@/server/enquiries/services/intake/detect-submission-spam";

const viewing = {
  kind: "viewing",
  data: {
    name: "Eleanor Vance",
    email: "eleanor@example.com",
    phone: "+44 7700 900101",
    eventType: "Weddings",
    preferredDate: "2026-06-14",
    consent: true as const,
  },
} as const;

describe("detectSubmissionSpam", () => {
  it("passes a genuine viewing enquiry", () => {
    expect(detectSubmissionSpam({ kind: viewing.kind, data: { ...viewing.data } })).toBe(false);
  });

  it("flags link-heavy proposal details", () => {
    expect(
      detectSubmissionSpam({
        kind: "proposal",
        data: {
          name: "Spam",
          email: "spam@example.com",
          phone: "+44 7700 900000",
          eventType: "Weddings",
          eventDate: "June",
          guests: 10,
          package: "Essential",
          services: [],
          consent: true as const,
          details: "See http://deal.example.com and https://offer.example.com now",
        },
      }),
    ).toBe(true);
  });

  it("flags suspicious TLDs", () => {
    expect(
      detectSubmissionSpam({
        kind: viewing.kind,
        data: { ...viewing.data, message: "Win prizes at casino-bonus.xyz today" },
      }),
    ).toBe(true);
  });
});
