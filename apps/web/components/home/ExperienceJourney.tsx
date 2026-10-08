import { JOURNEY_STEPS } from "@/lib/home-content";

/**
 * "Choose your experience" — four tiers, navy.
 * xl+: four tall photo panels with text on a fade over the image.
 * Below xl: photo on top, details underneath on deep navy (2 cols from sm).
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ExperienceJourney() {
  return (
    <section id="packages" className="w-full overflow-hidden bg-navy text-ivory">
      {/* Heading */}
      <div className="flex flex-col gap-6 px-[clamp(1.5rem,4vw,5rem)] pb-10 pt-20 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-28">
        <h2>
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/60">
            Choose
          </span>
          <span className="mt-2 block font-display text-[clamp(3.25rem,8.5vw,8rem)] leading-[0.95]">
            your experience
          </span>
        </h2>
        <p className="max-w-xs font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug text-ivory/70">
          Four ways to begin. Each step goes further.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid gap-3 px-3 pb-3 sm:grid-cols-2 xl:grid-cols-4">
        {JOURNEY_STEPS.map((step) => (
          <article
            key={step.word}
            className="group relative flex flex-col overflow-hidden bg-navy-deep xl:h-[88svh] xl:min-h-[680px]"
          >
            {/* Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden xl:absolute xl:inset-0 xl:aspect-auto">
              <img
                src={step.img}
                alt={step.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-linear-to-t from-navy-deep via-navy-deep/55 to-transparent xl:block"
              />
            </div>

            {/* Details */}
            <div className="relative flex flex-1 flex-col justify-end gap-5 p-6 md:p-8 xl:mt-auto xl:p-8">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                {step.add}
              </p>

              <h3 className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none">
                {step.word}
              </h3>

              <p className="font-serif text-lg italic leading-snug text-ivory/80">
                {step.line}
              </p>

              <ul className="flex flex-wrap gap-2">
                {step.chips.map((chip) => (
                  <li
                    key={chip}
                    className="bg-ivory/10 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-ivory/85"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <a
                href="/contact#proposal"
                className="mt-2 self-start bg-ivory px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-colors duration-500 hover:bg-white"
              >
                {step.cta}
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="px-[clamp(1.5rem,4vw,5rem)] py-10 text-center font-serif text-xl italic text-ivory/60 md:py-14">
        Tailored pricing is shared in your proposal.
      </p>
    </section>
  );
}