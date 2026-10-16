import { describe, expect, it } from "vitest";
import { proposalSchema } from "@/shared/schemas/proposal";
import { viewingSchema } from "@/shared/schemas/viewing";

const viewingForm = {
  name: "Eleanor Vance",
  email: "eleanor@example.com",
  phone: "+44 7700 900101",
  eventType: "Weddings",
  preferredDate: "2026-06-14",
  altDate: "2026-06-21",
  eventDate: "Summer 2026",
  guests: "120",
  message: "Garden ceremony if possible.",
  consent: "on",
};

const proposalForm = {
  name: "Marcus Chen / Acme / Events Lead",
  email: "marcus@example.com",
  phone: "+44 7700 900102",
  eventType: "Corporate & Conferences",
  eventDate: "12 June 2026",
  guests: "300",
  package: "Signature",
  services: ["Catering", "AV"],
  budget: "£20–30k",
  details: "Stage and lighting required.",
  source: "Referral",
  consent: "on",
};

describe("viewing schema", () => {
  it("accepts a real viewing form payload", () => {
    const parsed = viewingSchema.safeParse(viewingForm);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.guests).toBe(120);
      expect(parsed.data.consent).toBe(true);
    }
  });

  it("rejects a missing preferred viewing date", () => {
    const { preferredDate: _omitted, ...rest } = viewingForm;
    expect(viewingSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects a missing consent", () => {
    expect(viewingSchema.safeParse({ ...viewingForm, consent: false }).success).toBe(false);
  });
});

describe("proposal schema", () => {
  it("accepts a real proposal form payload", () => {
    const parsed = proposalSchema.safeParse(proposalForm);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.guests).toBe(300);
      expect(parsed.data.services).toEqual(["Catering", "AV"]);
    }
  });

  it("rejects an unknown package tier", () => {
    expect(proposalSchema.safeParse({ ...proposalForm, package: "Royal" }).success).toBe(false);
  });

  it("rejects a missing guest count", () => {
    const { guests: _omitted, ...rest } = proposalForm;
    expect(proposalSchema.safeParse(rest).success).toBe(false);
  });
});
