import { STACK_PANELS } from "@/lib/home-content";

/**
 * "More than a venue" — three layers, deep navy.
 * Each layer is a full-screen photo with the text on a soft navy fade.
 * lg+: text alternates left / right / left. Below lg: text at the bottom.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function VenueStack() {
  return (
    <section
      id="experiences"
      className="w-full overflow-hidden bg-navy-deep text-ivory"
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 px-[clamp(1.5rem,4vw,5rem)] pb-10 pt-20 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-28">
        <h2>
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/60">
            More than
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95]">
            a venue
          </span>
        </h2>
        <p className="max-w-xs font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug text-ivory/70">
          From space to complete delivery.
        </p>
      </div>

      {/* Layers */}
      <div className="flex flex-col gap-3 px-3 pb-3">
        {STACK_PANELS.map((panel, n) => {
          const right = n % 2 === 1;

          return (
            <article
              key={panel.word}
              className="group relative flex min-h-[88svh] items-end overflow-hidden bg-navy lg:min-h-svh lg:items-center"
            >
              {/* Photo */}
              <img
                src={panel.img}
                alt={panel.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-dg group-hover:scale-[1.04]"
              />

              {/* Soft navy fade: bottom on mobile, side on desktop */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/35 to-navy-deep/10 ${
                  right
                    ? "lg:bg-linear-to-l lg:from-navy-deep/85 lg:via-navy-deep/40 lg:to-transparent"
                    : "lg:bg-linear-to-r lg:from-navy-deep/85 lg:via-navy-deep/40 lg:to-transparent"
                }`}
              />

              {/* Big numeral on the opposite side (desktop only) */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 font-display text-[clamp(10rem,24vw,24rem)] leading-none text-ivory/[0.12] lg:block ${
                  right ? "left-[5%]" : "right-[5%]"
                }`}
              >
                {String(n + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div className="relative z-10 w-full p-7 md:p-12 lg:px-[clamp(3rem,6vw,8rem)]">
                <div className={`max-w-xl ${right ? "lg:ml-auto" : ""}`}>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-silver">
                    <span>{panel.badge}</span>
                    {panel.extra ? <span>{panel.extra}</span> : null}
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95]">
                    {panel.word}
                  </h3>

                  <p className="mt-5 font-serif text-[clamp(1.375rem,2.2vw,2rem)] italic leading-snug text-ivory/85">
                    {panel.line}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {panel.chips.map((chip) => (
                      <li
                        key={chip}
                        className="bg-ivory/12 px-3.5 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/90 backdrop-blur-sm"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Equation */}
      <p className="px-6 py-16 text-center md:py-28">
        <span className="font-display text-[clamp(2rem,6.5vw,6.5rem)] leading-none">
          Venue
        </span>
        <em className="mx-[0.35em] font-script text-[clamp(2rem,6.5vw,6.5rem)] not-italic leading-none text-ivory/50">
          +
        </em>
        <span className="font-display text-[clamp(2rem,6.5vw,6.5rem)] leading-none">
          Enhance
        </span>
        <em className="mx-[0.35em] font-script text-[clamp(2rem,6.5vw,6.5rem)] not-italic leading-none text-ivory/50">
          +
        </em>
        <span className="font-serif text-[clamp(2rem,6.5vw,6.5rem)] italic leading-none text-ivory/80">
          Experience
        </span>
      </p>
    </section>
  );
}