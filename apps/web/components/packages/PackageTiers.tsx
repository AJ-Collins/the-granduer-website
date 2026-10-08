import { PACKAGES } from "@/lib/packages-content";

const IMAGES: Record<string, { src: string; alt: string }> = {
  essential: {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80",
    alt: "The hall, ready for you to make it yours",
  },
  classic: {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
    alt: "The hall with tables, lighting and sound in place",
  },
  signature: {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80",
    alt: "A premium celebration with enhanced décor",
  },
  bespoke: {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
    alt: "A fully designed, full-service occasion",
  },
};

/** Staircase: each panel is taller than the last (xl and up). */
const STEPS = [
  "xl:h-[56svh]",
  "xl:h-[65svh]",
  "xl:h-[74svh]",
  "xl:h-[83svh]",
];

/**
 * Package tiers as a staircase, full screen.
 * xl+: four photo panels rising left to right, bottom-aligned.
 * sm to xl: two by two. Below sm: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function PackageTiers() {
  return (
    <section
      id="tiers"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-navy px-[clamp(1.5rem,4vw,5rem)] py-20 text-ivory md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/55">
            Choose your
          </span>
          <span className="mt-2 block font-serif text-[clamp(3rem,8vw,7.5rem)] italic leading-[1]">
            package
          </span>
        </h2>

        {/* Staircase */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 xl:grid-cols-4 xl:items-end xl:gap-4">
          {PACKAGES.map((p, i) => {
            const img = IMAGES[p.key];
            return (
              <article
                key={p.key}
                id={`tier-${p.key}`}
                className={`group relative flex min-h-[68svh] flex-col justify-between overflow-hidden bg-navy-deep sm:min-h-[60svh] xl:min-h-0 ${STEPS[i]}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/30 to-navy-deep/40"
                />

                {/* Step number */}
                <span className="relative z-10 p-6 font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver md:p-8">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="relative z-10 p-6 pt-0 md:p-8 md:pt-0">
                  <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
                    {p.positioning}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(2.5rem,3.4vw,3.5rem)] font-normal leading-[0.95]">
                    {p.word}
                  </h3>
                  <p className="mt-4 max-w-xs font-serif text-lg italic leading-snug text-ivory/80">
                    {p.presentation}
                  </p>
                  <a
                    href="#book"
                    className="mt-6 flex items-center justify-between gap-4 bg-ivory/12 px-5 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy"
                  >
                    {p.cta}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}