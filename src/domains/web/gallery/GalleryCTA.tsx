const BG_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=80";

/**
 * Closing CTA, full screen.
 * Photo, navy veil, big centred heading, two buttons.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function GalleryCTA() {
  return (
    <section
      id="book"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-32 pt-24 text-center text-ivory md:pb-24"
    >
      <img
        src={BG_IMAGE}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/80 via-navy/55 to-navy-deep/95"
      />

      <div className="relative z-10 w-full max-w-5xl">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          See it in person
        </span>
        <h2 className="mt-8">
          <span className="block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">
            Your turn to
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.92]">
            transform
          </span>
          <span className="block font-serif text-[clamp(3rem,9vw,8.5rem)] italic leading-[1] text-ivory/80">
            the space
          </span>
        </h2>

        <div className="mx-auto mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <a
            href="/contact#viewing"
            className="bg-ivory px-10 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-navy transition-colors duration-500 hover:bg-white"
          >
            Book a Viewing
          </a>
          <a
            href="/contact#proposal"
            className="bg-ivory/15 px-10 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy"
          >
            Request a Proposal
          </a>
        </div>
      </div>
    </section>
  );
}