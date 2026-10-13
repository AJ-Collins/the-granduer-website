const BG_IMAGE =
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=2400&q=80";

const STEPS = [
  {
    script: "Park",
    name: "Parking",
    line: "Space for your guests, close to the door.",
    img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    alt: "A parking area for guests",
  },
  {
    script: "Step out",
    name: "Drop-off",
    line: "A smooth arrival for every guest.",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    alt: "A car arriving at the entrance",
  },
  {
    script: "Rest easy",
    name: "Security",
    line: "Looked after from arrival to goodbye.",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    alt: "Security at the venue entrance",
  },
];

/**
 * Arrival and security, full screen.
 * Photo background, big centred heading, three image cards at the bottom.
 * lg+: cards in a row. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ArrivalSecurity() {
  return (
    <section
      id="arrival"
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-12 pt-24 text-ivory md:pt-32"
    >
      {/* Photo */}
      <img
        src={BG_IMAGE}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Navy veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/85 via-navy-deep/60 to-navy-deep/95"
      />

      {/* Heading */}
      <h2 className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          Arrival &amp; security
        </span>
        <span className="mt-8 block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">
          From the first step
        </span>
        <span className="mt-2 block font-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.95]">
          Welcome
        </span>
        <span className="block font-serif text-[clamp(2.75rem,8vw,7.5rem)] italic leading-[1] text-ivory/80">
          in
        </span>
      </h2>

      {/* Image cards */}
      <div className="relative z-10 mx-auto mt-14 grid w-full max-w-[1500px] gap-3 md:mt-20 lg:grid-cols-3 lg:gap-4">
        {STEPS.map((s) => (
          <figure
            key={s.name}
            className="group m-0 overflow-hidden bg-ivory/10 backdrop-blur-md"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[4/3]">
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
              />
            </div>
            <figcaption className="p-6 md:p-8">
              <span className="block font-script text-[clamp(1.75rem,2.2vw,2.25rem)] leading-none text-ivory/65">
                {s.script}
              </span>
              <b className="mt-1 block font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-none">
                {s.name}
              </b>
              <span className="mt-3 block font-serif text-lg italic leading-snug text-ivory/80">
                {s.line}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}