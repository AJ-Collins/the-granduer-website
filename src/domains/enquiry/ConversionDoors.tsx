const DOORS = [
  {
    key: "viewing",
    script: "Come and",
    title: "Book a Viewing",
    line: "Walk the hall and see it for yourself.",
    href: "#viewing",
    external: false,
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "proposal",
    script: "Tailored",
    title: "Request a Proposal",
    line: "Shaped around your date and guest list.",
    href: "#proposal",
    external: false,
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "whatsapp",
    script: "Just ask",
    title: "WhatsApp Us",
    line: "A quick question? Message us now.",
    href: "https://wa.me/YOURNUMBER",
    external: true,
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  },
];

/**
 * Contact page opener, full screen.
 * Three full-height photo doors with a heading over the top.
 * lg+: side by side, full screen height. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ConversionDoors() {
  return (
    <section
      id="book"
      className="relative grid min-h-svh w-full overflow-hidden bg-navy-deep text-ivory lg:grid-cols-3"
    >
      {/* Heading over the photos */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6 text-center md:top-32">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          Choose how you&rsquo;d like to begin
        </span>
        <span className="mt-4 block font-script text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ivory [text-shadow:0_2px_28px_rgba(19,30,42,0.6)]">
          Let&rsquo;s talk
        </span>
      </div>

      {DOORS.map((d) => (
        <a
          key={d.key}
          href={d.href}
          {...(d.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
          className="group relative flex min-h-[62svh] items-end overflow-hidden lg:min-h-svh"
        >
          <img
            src={d.img}
            alt=""
            loading={d.key === "viewing" ? "eager" : "lazy"}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/55 transition-colors duration-500 group-hover:from-navy-deep/80"
          />

          <div className="relative z-10 flex w-full items-end justify-between gap-4 p-7 pb-12 md:p-10 md:pb-16">
            <div>
              <span className="block font-script text-[clamp(2rem,3vw,3rem)] leading-none text-ivory/70">
                {d.script}
              </span>
              <b className="mt-1 block font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-normal leading-[0.95]">
                {d.title}
              </b>
              <span className="mt-4 block max-w-xs font-serif text-lg italic leading-snug text-ivory/80">
                {d.line}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="shrink-0 pb-1 font-sans text-3xl transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}