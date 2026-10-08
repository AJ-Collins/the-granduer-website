const PANELS = [
  {
    script: "Always",
    word: "Cool",
    line: "Air conditioning, so every guest stays comfortable.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    alt: "A bright, comfortable interior",
  },
  {
    script: "Never",
    word: "Dark",
    line: "Backup power, so the celebration never pauses.",
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=2000&q=80",
    alt: "Warm lights glowing over a celebration",
  },
];

/**
 * Climate and power, full screen.
 * Two big photos, one for air conditioning, one for backup power.
 * lg+: side by side, each full screen height. Below lg: stacked, each
 * most of a screen tall.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function PowerClimate() {
  return (
    <section
      id="climate"
      className="grid min-h-svh w-full overflow-hidden bg-navy-deep lg:grid-cols-2"
    >
      {PANELS.map((p) => (
        <figure
          key={p.word}
          className="group relative m-0 flex min-h-[85svh] items-end overflow-hidden text-ivory lg:min-h-svh"
        >
          <img
            src={p.img}
            alt={p.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/40"
          />

          <span className="absolute left-[clamp(1.5rem,4vw,4rem)] top-24 z-10 font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver md:top-32">
            Climate &amp; power
          </span>

          <figcaption className="relative z-10 w-full px-[clamp(1.5rem,4vw,4rem)] pb-28 md:pb-20">
            <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/65">
              {p.script}
            </span>
            <b className="mt-2 block font-display text-[clamp(4.5rem,12vw,11rem)] font-normal leading-[0.9]">
              {p.word}
            </b>
            <span className="mt-6 block max-w-xs font-serif text-[clamp(1.125rem,1.6vw,1.625rem)] italic leading-snug text-ivory/85">
              {p.line}
            </span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}