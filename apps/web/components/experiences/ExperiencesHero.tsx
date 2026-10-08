import {
  EXPERIENCES_HERO,
  EXPERIENCE_LAYERS,
} from "@/lib/experiences-content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2400&q=80";

/**
 * Experiences hero, full screen on every device.
 * Photo, navy veil, mixed-type headline, and a three-layer preview row.
 * sm+: preview row links to each layer. Below sm: square scroll button.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function ExperiencesHero() {
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
          {EXPERIENCES_HERO.eyebrow}
        </span>

        <span className="mt-8 block font-script text-[clamp(2.75rem,6vw,5.5rem)] leading-none text-ivory/65">
          Layer by layer
        </span>

        <h1 className="mx-auto mt-3 max-w-5xl font-display text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[1]">
          {EXPERIENCES_HERO.title}
        </h1>

        <p className="mx-auto mt-8 max-w-md font-serif text-[clamp(1.125rem,1.8vw,1.75rem)] italic leading-snug text-ivory/85">
          {EXPERIENCES_HERO.copy}
        </p>
      </div>

      {/* Layer preview row (sm+) */}
      <div className="absolute inset-x-0 bottom-10 z-10 hidden px-[clamp(1.25rem,4vw,5rem)] sm:block">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 md:gap-4">
          {EXPERIENCE_LAYERS.map((layer) => (
            <a
              key={layer.key}
              href={`#layer-${layer.key}`}
              className="group bg-ivory/12 px-5 py-4 text-left backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:px-7 md:py-5"
            >
              <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-silver transition-colors duration-500 group-hover:text-navy/60">
                {layer.badge}
              </span>
              <b className="mt-1 block font-display text-[clamp(1.375rem,2.2vw,2rem)] font-normal leading-none">
                {layer.word}
              </b>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll button (below sm) */}
      <a
        href="#layers"
        aria-label="Scroll to the layers"
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