export const BOOKING_HERO = {
  eyebrow: "D'Grandeur Event Centre",
  title: "Website to event.",
  copy: "Discover → Explore → Enquire → View → Proposal → Hold → Deposit → Contract → Plan → Deliver → Review.",
} as const;

export const JOURNEY_STAGES = [
  { key: "discover", stage: "Discover", support: "SEO, social links, campaigns, Google/business listings" },
  { key: "explore", stage: "Explore", support: "Event pages, gallery, packages, venue facts" },
  { key: "enquire", stage: "Enquire", support: "Proposal form, WhatsApp, phone" },
  { key: "view", stage: "View", support: "Viewing request + calendar workflow" },
  { key: "proposal", stage: "Proposal", support: "Branded quotation / proposal sent by sales team" },
  { key: "hold", stage: "Hold Date", support: "Clear policy and payment instructions" },
  { key: "deposit", stage: "Deposit", support: "Clear policy and payment instructions" },
  { key: "contract", stage: "Contract", support: "Digital or controlled signed agreement" },
  { key: "plan", stage: "Plan", support: "Event brief, supplier information, final details" },
  { key: "deliver", stage: "Deliver", support: "Operational event file takes over" },
  { key: "review", stage: "Review", support: "Automated follow-up and review/testimonial request" },
] as const;
