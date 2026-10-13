export const GALLERY_HERO = {
  eyebrow: "D'Grandeur Event Centre",
  title: "One space, many transformations",
  copy: "Same space, different configurations.",
} as const;

export const GALLERY_GROUPS = [
  {
    key: "hero-film",
    asset: "Hero film",
    requirement: "20–40s silent loop, landscape, compressed",
    use: "Homepage hero",
  },
  {
    key: "venue-empty",
    asset: "Venue empty",
    requirement: "Wide, symmetrical, daylight/evening",
    use: "Venue page, brochures",
  },
  {
    key: "transformations",
    asset: "Event transformations",
    requirement: "Same space, different configurations",
    use: "Homepage, Gallery, Events",
  },
  {
    key: "arrival",
    asset: "Arrival / exterior",
    requirement: "Day + night, signage, entrance",
    use: "Venue/About",
  },
  {
    key: "tables-decor",
    asset: "Tables / décor",
    requirement: "Wide + detail shots",
    use: "Wedding/Celebration",
  },
  {
    key: "corporate",
    asset: "Corporate setup",
    requirement: "Stage, screen, seating, registration",
    use: "Corporate page",
  },
  {
    key: "technical",
    asset: "Technical",
    requirement: "Sound, lighting, AV in operation",
    use: "Experience/Corporate/Concert",
  },
  {
    key: "hospitality",
    asset: "Hospitality",
    requirement: "Ushers, welcome, VIP, service moments",
    use: "Experience/About",
  },
  {
    key: "facilities",
    asset: "Facilities",
    requirement: "Toilets, changing room, parking, access",
    use: "Venue page",
  },
  {
    key: "vertical-video",
    asset: "Vertical video",
    requirement: "9:16 social-first clips",
    use: "Social campaigns",
  },
] as const;