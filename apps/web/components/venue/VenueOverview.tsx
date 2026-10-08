const CHAPTERS = [
  {
    script: "First",
    word: "Arrive",
    line: "A grand welcome before the doors even open.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
    alt: "Guests arriving at D'Grandeur Event Centre",
  },
  {
    script: "Then",
    word: "Gather",
    line: "One hall, shaped around your guests.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80",
    alt: "The hall styled for a seated dinner",
  },
  {
    script: "Together",
    word: "Celebrate",
    line: "Light, music and moments that stay with you.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80",
    alt: "A celebration in full swing at the hall",
  },
];

const CLOSING_IMAGE =
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=2400&q=80";

/**
 * Venue overview told as a story: Arrive, Gather, Celebrate, Remember.
 * Each chapter is full screen. lg+: image and text split 50/50, alternating
 * sides. Below lg: image first, text below.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function VenueOverview() {
  return (
    <section id="overview" className="w-full overflow-hidden">
      {/* Opening statement */}
      <div className="flex min-h-[70svh] flex-col items-center justify-center bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-24 text-center text-navy md:py-32">
        <span className="font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
          The story of
        </span>
        <h2 className="mt-4">
          <span className="block font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.95]">
            D&rsquo;Grandeur
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            one day, told in four moments
          </span>
        </h2>
      </div>

      {/* Chapters */}
      {CHAPTERS.map((c, i) => {
        const reverse = i % 2 === 1;
        const dark = i % 2 === 0;
        return (
          <div
            key={c.word}
            className={`grid min-h-svh w-full lg:grid-cols-2 ${
              dark ? "bg-navy text-ivory" : "bg-ivory text-navy"
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-svh ${
                reverse ? "lg:order-2" : ""
              }`}
            >
              <img
                src={c.img}
                alt={c.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:py-20">
              <span
                className={`block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none ${
                  dark ? "text-ivory/55" : "text-navy/55"
                }`}
              >
                {c.script}
              </span>
              <h3 className="mt-3 font-display text-[clamp(3.75rem,9vw,8.5rem)] leading-[0.95]">
                {c.word}
              </h3>
              <p
                className={`mt-8 max-w-xs font-serif text-[clamp(1.25rem,1.8vw,1.75rem)] italic leading-snug ${
                  dark ? "text-ivory/80" : "text-navy/75"
                }`}
              >
                {c.line}
              </p>
            </div>
          </div>
        );
      })}

      {/* Closing: Remember */}
      <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] py-24 text-center text-ivory">
        <img
          src={CLOSING_IMAGE}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/85"
        />
        <div className="relative z-10">
          <span className="block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">
            And always
          </span>
          <h3 className="mt-3 font-serif text-[clamp(4rem,12vw,11rem)] italic leading-[0.95]">
            Remember
          </h3>
          <p className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
            moments that become lasting memories
          </p>
        </div>
      </div>
    </section>
  );
}