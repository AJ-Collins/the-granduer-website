export const EXPERIENCES_HERO = {
  eyebrow: "D'Grandeur Event Centre",
  title: "Three layers. One extraordinary experience.",
  copy: "A progression of value — not three competing products.",
} as const;

export const EXPERIENCE_LAYERS = [
  {
    key: "venue",
    badge: "01",
    word: "Venue",
    message: "The foundation for an exceptional event.",
    services: ["Hall", "Furniture", "Power", "AC", "Parking", "Toilets", "Standard security", "Cleaning"],
  },
  {
    key: "enhance",
    badge: "02",
    word: "Enhance",
    extra: "Venue +",
    message: "Elevate the atmosphere and make delivery easier.",
    services: ["Sound", "Lighting", "Décor", "Catering", "Ushers", "Technical services"],
  },
  {
    key: "experience",
    badge: "03",
    word: "Experience",
    extra: "Venue + Enhance +",
    message: "Let D'Grandeur help bring the complete occasion together.",
    services: ["Planning", "Coordination", "VIP hospitality", "Production", "Complete delivery"],
  },
] as const;
