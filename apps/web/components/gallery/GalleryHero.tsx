import { GALLERY_HERO } from "@/lib/gallery-content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2400&q=80";

/**
 * Gallery hero, full screen on every device.
 * Photo, navy veil, mixed-type title bottom-left (lg+) or centred (below).
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function GalleryHero() {
  return (
    <section className="relative flex min-h-svh w-full items-end justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-32 pt-32 text-center text-ivory sm:pb-28 lg:justify-start lg:text-left">
      <img
        src={HERO_IMAGE}
        alt="A celebration in full swing at D'Grandeur Event Centre"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy/25 to-navy-deep/95"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          {GALLERY_HERO.eyebrow}
        </span>

        <h1 className="mt-6 font-display text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.95]">
          {GALLERY_HERO.title}
        </h1>

        <p className="mt-6 font-script text-[clamp(2.25rem,4.5vw,4rem)] leading-none text-ivory/70">
          {GALLERY_HERO.copy}
        </p>
      </div>

      <a
        href="#transformations"
        aria-label="Scroll to the gallery"
        className="absolute bottom-24 left-1/2 z-10 flex size-12 -translate-x-1/2 items-center justify-center bg-ivory/15 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:bottom-10 lg:left-auto lg:right-[clamp(1.5rem,4vw,5rem)] lg:translate-x-0"
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