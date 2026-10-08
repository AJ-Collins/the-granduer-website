const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80";

const FACTS = [
  {
    value: "0,000",
    label: "Guest capacity",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    value: "00",
    label: "Parking bays",
    icon: (
      <>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </>
    ),
  },
  {
    value: "Backup",
    label: "Power",
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
  {
    value: "Full",
    label: "Air conditioning",
    icon: (
      <>
        <line x1="2" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="m20 16-4-4 4-4" />
        <path d="m4 8 4 4-4 4" />
        <path d="m16 4-4 4-4-4" />
        <path d="m8 20 4-4 4 4" />
      </>
    ),
  },
  {
    value: "AV",
    label: "Technical ready",
    icon: (
      <>
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <circle cx="12" cy="14" r="4" />
        <line x1="12" x2="12.01" y1="6" y2="6" />
      </>
    ),
  },
  {
    value: "Easy",
    label: "Location and access",
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

const STRIP = [
  {
    src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1400&q=80",
    alt: "D'Grandeur exterior at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    alt: "VIP lounge at D'Grandeur",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
    alt: "Stage and lighting at D'Grandeur",
  },
];

/**
 * Venue at a glance, full screen.
 * lg+: facts on navy at left, huge hall photo bleeding to the right edge.
 * Below lg: photo first, then facts. A tall three-photo strip closes the section.
 * Rectangles only. No borders, no lines, no rounding.
 * Figures are placeholders until management verifies them.
 */
export function VenueFacts() {
  return (
    <section id="venue" className="w-full overflow-hidden bg-navy text-ivory">
      {/* Facts + big photo */}
      <div className="grid min-h-svh lg:grid-cols-12">
        {/* Big photo (first on mobile, right on desktop) */}
        <div className="relative order-first aspect-[4/5] w-full sm:aspect-[3/2] lg:order-last lg:col-span-7 lg:aspect-auto lg:min-h-svh">
          <img
            src={MAIN_IMAGE}
            alt="The main hall at D'Grandeur Event Centre"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Text + fact tiles */}
        <div className="flex flex-col justify-center gap-10 px-[clamp(1.5rem,4vw,5rem)] py-16 lg:col-span-5 lg:py-20">
          <div>
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
              The venue at a glance
            </span>
            <h2 className="mt-5">
              <span className="block font-display text-[clamp(3rem,6.5vw,6rem)] leading-[0.98]">
                Everything
              </span>
              <span className="block font-serif text-[clamp(2.5rem,5vw,4.5rem)] italic leading-[1.05] text-ivory/70">
                in place.
              </span>
            </h2>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {FACTS.map((fact) => (
              <li
                key={fact.label}
                className="flex min-h-[150px] flex-col justify-between bg-ivory/[0.07] p-5 transition-colors duration-500 hover:bg-ivory/[0.13] sm:min-h-[170px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-7 text-silver"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {fact.icon}
                </svg>
                <div>
                  <b className="block font-display text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-none">
                    {fact.value}
                  </b>
                  <span className="mt-3 block font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    {fact.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="/venue"
            className="group inline-flex items-center gap-3 self-start font-serif text-2xl italic text-ivory transition-colors duration-500 hover:text-white"
          >
            See the full venue
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Tall photo strip */}
      <div className="grid gap-3 p-3 sm:grid-cols-3 sm:gap-3 sm:p-3">
        {STRIP.map((s) => (
          <div
            key={s.alt}
            className="group relative aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-auto sm:h-[75svh]"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}