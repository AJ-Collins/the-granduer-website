export const EVENTS = [
  {
    slug: "weddings",
    title: "Weddings",
    story: "A beautiful, personalised celebration with support from planning to final guest departure.",
    services: ["Décor", "Catering", "VIP", "Coordination", "AV", "Media"],
    cta: "Plan Your Wedding",
  },
  {
    slug: "birthdays-celebrations",
    title: "Birthdays & Celebrations",
    story: "Transform the venue around the personality and occasion.",
    services: ["Styling", "DJ/entertainment", "Catering", "Lighting", "Media"],
    cta: "Plan Your Celebration",
  },
  {
    slug: "corporate-conferences",
    title: "Corporate & Conferences",
    story: "Professional, reliable and presentation-ready.",
    services: ["Layouts", "AV", "Screens", "Registration", "Catering", "Branding"],
    cta: "Request Corporate Proposal",
  },
  {
    slug: "church-faith",
    title: "Church & Faith",
    story: "Flexible gathering space with dependable technical support.",
    services: ["Sound", "Stage", "Screens", "Seating", "Parking", "Livestream"],
    cta: "Discuss Your Event",
  },
  {
    slug: "concerts-entertainment",
    title: "Concerts & Entertainment",
    story: "Production-led venue solution subject to event requirements.",
    services: ["Sound", "Lighting", "Stage", "Backstage", "Security", "Technical crew"],
    cta: "Request Production Review",
  },
  {
    slug: "memorials",
    title: "Memorials",
    story: "Respectful, calm and thoughtfully coordinated gatherings.",
    services: ["Seating", "Catering", "Tribute AV", "Ushers", "Family/VIP support"],
    cta: "Speak to Our Team",
  },
  {
    slug: "community-special",
    title: "Community / Special",
    story: "Flexible venue use subject to suitability and availability.",
    services: ["Core venue", "Selected support"],
    cta: "Make an Enquiry",
  },
] as const;

export type EventSlug = (typeof EVENTS)[number]["slug"];
export type EventEntry = (typeof EVENTS)[number];
