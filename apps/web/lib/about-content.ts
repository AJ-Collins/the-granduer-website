export const ABOUT_HERO = {
  eyebrow: "D'Grandeur Event Centre",
  title: "About D'Grandeur.",
  copy: "What D'Grandeur exists to make possible.",
} as const;

export const EXPERIENCE_PILLARS = [
  { key: "comfort", title: "Comfort", line: "Rooms, air and seating that look after guests." },
  { key: "detail", title: "Detail", line: "Small decisions, finished properly." },
  { key: "service", title: "Personal service", line: "People who notice and respond." },
  { key: "delivery", title: "Dependable delivery", line: "Sound, light and timing you can trust." },
] as const;

export const TRUST_SIGNALS = [
  { key: "photo", label: "Real venue photography and video" },
  { key: "specs", label: "Verified specifications and capacities" },
  { key: "testimonials", label: "Real client testimonials after launch" },
  { key: "contact", label: "Named contact channels and physical location" },
  { key: "terms", label: "Clear terms, privacy and cookies" },
  { key: "partners", label: "Partner logos only with permission" },
  { key: "cases", label: "Case studies after successful events" },
] as const;
