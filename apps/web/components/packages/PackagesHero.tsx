import { PACKAGES, PACKAGES_HERO } from "@/lib/packages-content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2400&q=80";

/**
 * Packages hero, full screen on every device.
 * Photo, navy veil, mixed-type headline, four-package preview row.
 * sm+: preview row links to each package. Below sm: square scroll button.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function PackagesHero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-[clamp(1.25rem,4vw,5rem)] pb-36 pt-28 text-center text-ivory sm:pb-32">
      <img
        src={HERO_IMAGE}
        alt=""
        fetchPriority="high"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/80 via-navy/35 to-navy-deep/90"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          {PACKAGES_HERO.eyebrow}
        </span>

        <h1 className="mt-8 font-display text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.92]">
          {PACKAGES_HERO.title}
        </h1>

        <p className="mt-6 font-script text-[clamp(2.25rem,4.5vw,4rem)] leading-none text-ivory/70">
          {PACKAGES_HERO.copy}
        </p>
      </div>

      {/* Package preview row (sm+) */}
      <div className="absolute inset-x-0 bottom-10 z-10 hidden px-[clamp(1.25rem,4vw,5rem)] sm:block">
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-3 md:gap-4">
          {PACKAGES.map((p, i) => (
            <a
              key={p.key}
              href={`#tier-${p.key}`}
              className="group bg-ivory/12 px-4 py-4 text-left backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:px-6 md:py-5"
            >
              <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-silver transition-colors duration-500 group-hover:text-navy/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <b className="mt-1 block font-display text-[clamp(1.125rem,1.9vw,1.75rem)] font-normal leading-none">
                {p.word}
              </b>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll button (below sm) */}
      <a
        href="#tiers"
        aria-label="Scroll to the packages"
        className="absolute bottom-24 left-1/2 z-10 flex size-12 -translate-x-1/2 items-center justify-center bg-ivory/15 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy sm:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}