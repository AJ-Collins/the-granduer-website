import { VENUE_HERO } from "@/lib/venue-content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=80";

/**
 * Venue hero, full screen.
 * One huge photo, navy veil, type anchored bottom-left, square scroll button.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function VenueHero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col justify-end overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-32 pt-32 text-ivory md:pb-20">
      {/* Photo */}
      <img
        src={HERO_IMAGE}
        alt="The main hall at D'Grandeur Event Centre"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Navy veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/95 via-navy/30 to-navy-deep/60"
      />

      {/* Title */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          The Venue
        </span>

        <h1 className="mt-6">
          <span className="block font-script text-[clamp(2.75rem,6vw,5.5rem)] leading-none text-ivory/65">
            Step inside
          </span>
          <span className="mt-2 block font-display text-[clamp(3.75rem,12vw,11.5rem)] leading-[0.9]">
            a hall made
          </span>
          <span className="block font-serif text-[clamp(3rem,9.5vw,9rem)] italic leading-[1] text-ivory/80">
            for your story
          </span>
        </h1>
      </div>

      {/* Scroll button */}
      <a
        href="#overview"
        aria-label="Scroll to overview"
        className="absolute bottom-24 right-[clamp(1.5rem,4vw,5rem)] z-10 flex size-12 items-center justify-center bg-ivory/15 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:bottom-10"
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