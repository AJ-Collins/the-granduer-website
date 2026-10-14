import { eventImage } from "./images";

const HERO_IMAGE = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=75"
/**
 * Event landing hero, full screen on every device.
 * Photo, navy veil, mixed-type title, square scroll button.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function EventHero({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-[clamp(1.25rem,4vw,5rem)] pb-32 pt-28 text-center text-ivory sm:pb-28">
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
          D&rsquo;Grandeur Event Centre
        </span>

        <h1 className="mt-8">
          <span className="block font-script text-[clamp(2.75rem,6vw,5.5rem)] leading-none text-ivory/65">
            Made for
          </span>
          <span className="mt-2 block font-display text-[clamp(3.75rem,13vw,12rem)] leading-[0.92]">
            {title}
          </span>
        </h1>
      </div>

      <a
        href="#story"
        aria-label="Scroll to the story"
        className="absolute bottom-24 left-1/2 z-10 flex size-12 -translate-x-1/2 items-center justify-center bg-ivory/15 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:bottom-10"
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