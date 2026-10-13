export const NAV_LINKS = [
  { label: "Venue", href: "/venue", menuNote: "The space" },
  { label: "Events", href: "/events", menuNote: "Every occasion" },
  { label: "Experiences", href: "/experiences", menuNote: "Three layers" },
  { label: "Packages", href: "/packages", menuNote: "Four ways in" },
  { label: "Gallery", href: "/gallery", menuNote: "See it styled" },
  { label: "Blog", href: "/blog", menuNote: "Stories" },
  { label: "Contact Us", href: "/contact", menuNote: "Say hello" },
  { label: "About Us", href: "/about", menuNote: "Find Out" },
] as const;

export const HERO = {
  eyebrow: "D'Grandeur Event Centre",
  title: "Experience Beyond the Ordinary",
  tagline: "A distinguished destination for life's most important moments",
  copy: "Elegant surroundings and thoughtful hospitality for weddings, private receptions and business events.",
  poster:
    "https://images.pexels.com/videos/34926864/pexels-photo-34926864.jpeg?auto=compress&w=1260&h=750&dpr=1",
} as const;

export const MISSION = {
  statement:
    "D'Grandeur Event Centre is a destination for celebrations, corporate gatherings and special occasions.",
  purpose:
    "With a focus on comfort, attention to detail and personal service, our purpose is to help people celebrate their milestones, connect with others and create lasting memories.",
} as const;

export const MOSAIC_TILES = [
  {
    key: "t1",
    wordClass: "w-wed",
    word: "Wed",
    caption: "Weddings, personalised start to finish.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80",
    alt: "Weddings",
  },
  {
    key: "t2",
    wordClass: "w-gala",
    word: "GALA",
    caption: "Celebrations and milestones.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=80",
    alt: "Celebrations",
  },
  {
    key: "t3",
    wordClass: "w-summit",
    word: "Summit",
    caption: "Corporate and conferences.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    alt: "Corporate events",
  },
  {
    key: "t4",
    wordClass: "w-light",
    word: "Light",
    caption: "Concerts and entertainment.",
    img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80",
    alt: "Concerts",
  },
  {
    key: "t5",
    wordClass: "w-toast",
    word: "Toast",
    caption: "Community and special occasions.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=80",
    alt: "Community and special events",
  },
  {
    key: "t6",
    wordClass: "w-faith",
    word: "FAITH",
    caption: "Church gatherings.",
    img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
    alt: "Church and faith",
  },
  {
    key: "t7",
    wordClass: "w-remember",
    word: "Remember",
    caption: "Calm and respectful.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=75",
    alt: "Memorials",
  },
] as const;

export const STACK_PANELS = [
  {
    word: "Venue",
    line: "The space.",
    chips: ["Hall", "Power", "Air conditioning"],
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=78",
    alt: "The empty hall",
    badge: "01",
    extra: null,
  },
  {
    word: "Enhance",
    line: "The atmosphere.",
    chips: ["Sound", "Lighting", "Décor"],
    img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1800&q=78",
    alt: "The hall with lighting and sound",
    badge: "02",
    extra: "Venue +",
  },
  {
    word: "Experience",
    line: "The complete occasion.",
    chips: ["Planning", "VIP care", "Full delivery"],
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=78",
    alt: "A complete event",
    badge: "03",
    extra: "Venue + Enhance +",
  },
] as const;

export const JOURNEY_STEPS = [
  {
    add: "Venue hire",
    word: "Essential",
    wordClass: "jw0",
    line: "The hall, ready for you.",
    chips: ["Hall and power", "Parking and toilets", "Security"],
    cta: "Enquire",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=78",
    alt: "The empty hall",
  },
  {
    add: "Essential +",
    word: "Classic",
    wordClass: "jw1",
    line: "A supported event.",
    chips: ["Sound and lighting", "Ushers", "Changing room"],
    cta: "Explore Classic",
    img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=78",
    alt: "A supported gathering",
  },
  {
    add: "Classic +",
    word: "Signature",
    wordClass: "jw2",
    line: "The premium experience.",
    chips: ["Enhanced décor and AV", "Coordinator", "VIP support"],
    cta: "Explore Signature",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=78",
    alt: "A premium celebration",
  },
  {
    add: "Signature +",
    word: "Bespoke",
    wordClass: "jw3",
    line: "Full service, designed for you.",
    chips: ["Planning and décor", "Catering", "Production"],
    cta: "Design My Event",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=78",
    alt: "A fully designed wedding",
  },
] as const;

export const MOMENTS = [
  {
    title: "Arrival",
    titleClass: "xt0",
    desc: "A warm welcome at the door",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=78",
    alt: "Guests arriving",
    badgeClass: "xb1",
  },
  {
    title: "Hospitality",
    titleClass: "xt1",
    desc: "Thoughtful service throughout",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=78",
    alt: "Hospitality",
    badgeClass: "xb2",
  },
  {
    title: "Guest care",
    titleClass: "xt2",
    desc: "Comfort and attention",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=78",
    alt: "Guest care",
    badgeClass: "xb3",
  },
  {
    title: "Reliability",
    titleClass: "xt3",
    desc: "Sound, lighting and AV that work",
    img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1600&q=78",
    alt: "Technical reliability",
    badgeClass: "xb4",
  },
  {
    title: "VIP support",
    titleClass: "xt4",
    desc: "Dedicated care for key guests",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=78",
    alt: "VIP support",
    badgeClass: "xb5",
  },
  {
    title: "Seamless",
    titleClass: "xt5",
    desc: "One team, start to finish",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=78",
    alt: "Seamless delivery",
    badgeClass: "xb6",
  },
] as const;
