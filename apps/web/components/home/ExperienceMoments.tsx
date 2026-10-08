import { MOMENTS } from "@/lib/home-content";

/**
 * The D'Grandeur experience — six moments, navy.
 * lg+: heading pinned on the left, six tall photos in two columns on the right.
 * Below lg: heading on top, photos in 1 column (2 from sm).
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ExperienceMoments() {
  return (
    <section
      id="moments"
      className="w-full overflow-x-clip bg-navy text-ivory"
    >
      <div className="grid lg:grid-cols-12">
        {/* Pinned heading */}
        <div className="flex flex-col justify-center gap-8 px-[clamp(1.5rem,4vw,5rem)] pb-12 pt-20 lg:sticky lg:top-0 lg:col-span-4 lg:h-svh lg:py-24">
          <h2>
            <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/60">
              The
            </span>
            <span className="mt-2 block font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95]">
              D&rsquo;Grandeur
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.5rem,5vw,4.5rem)] italic leading-[1.05] text-ivory/70">
              experience
            </span>
          </h2>

          <p className="max-w-xs font-serif text-[clamp(1.25rem,1.8vw,1.625rem)] italic leading-snug text-ivory/65">
            Six moments, from the first hello to the last goodbye.
          </p>

          <a
            href="/contact#viewing"
            className="self-start bg-ivory px-9 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-navy transition-colors duration-500 hover:bg-white"
          >
            Book a Viewing
          </a>
        </div>

        {/* Photos */}
        <div className="grid gap-3 px-3 pb-3 sm:grid-cols-2 lg:col-span-8 lg:p-3 lg:pl-0">
          {MOMENTS.map((m, i) => (
            <article
              key={m.title}
              className="group relative aspect-[4/5] overflow-hidden bg-navy-deep lg:aspect-[3/4]"
            >
              <img
                src={m.img}
                alt={m.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-[1.05]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-navy-deep/25"
              />

              <span
                aria-hidden="true"
                className="absolute left-6 top-5 font-display text-[clamp(3rem,5vw,5rem)] leading-none text-ivory/90 md:left-8 md:top-6"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-display text-[clamp(2rem,3vw,3rem)] leading-none">
                  {m.title}
                </h3>
                <p className="mt-3 max-w-xs font-serif text-lg italic leading-snug text-ivory/80">
                  {m.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}