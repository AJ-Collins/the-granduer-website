import { EXPERIENCE_LAYERS } from "@/lib/experiences-content";

const IMAGES: Record<string, { src: string; alt: string }> = {
  venue: {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80",
    alt: "The hall at D'Grandeur Event Centre",
  },
  enhance: {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80",
    alt: "Lighting and sound lifting the atmosphere",
  },
  experience: {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=2400&q=80",
    alt: "A complete occasion, beautifully delivered",
  },
};

/**
 * Three layers as a story of progression, full screen.
 * Chapter 1 (ivory): image left. Chapter 2 (navy): image right.
 * Chapter 3: full-bleed photo. Then an image equation.
 * lg+: split chapters 50/50. Below lg: image first, text below.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function ExperienceLayers() {
  return (
    <section id="layers" className="w-full overflow-hidden">
      {EXPERIENCE_LAYERS.map((layer, i) => {
        const img = IMAGES[layer.key];
        const extra = "extra" in layer ? layer.extra : "Begin with";

        /* Chapter 3: full-bleed photo */
        if (i === 2) {
          return (
            <div
              key={layer.key}
              id={`layer-${layer.key}`}
              className="relative flex min-h-svh w-full items-end justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-24 pt-32 text-center text-ivory md:items-center md:pb-24"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/90"
              />

              <div className="relative z-10 w-full max-w-5xl">
                <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
                  {layer.badge}
                </span>
                <span className="mt-6 block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">
                  {extra}
                </span>
                <h3 className="mt-2 font-display text-[clamp(3.75rem,13vw,12rem)] font-normal leading-[0.92]">
                  {layer.word}
                </h3>
                <p className="mx-auto mt-6 max-w-md font-serif text-[clamp(1.25rem,2vw,1.875rem)] italic leading-snug text-ivory/85">
                  {layer.message}
                </p>
                <ul className="m-0 mt-10 flex list-none flex-wrap justify-center gap-2 p-0 sm:gap-3">
                  {layer.services.map((s) => (
                    <li
                      key={s}
                      className="bg-ivory/12 px-4 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur-md sm:px-5"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        /* Chapters 1 and 2: split */
        const dark = i === 1;
        const reverse = i === 1;

        return (
          <div
            key={layer.key}
            id={`layer-${layer.key}`}
            className={`grid min-h-svh w-full lg:grid-cols-2 ${
              dark ? "bg-navy text-ivory" : "bg-ivory text-navy"
            }`}
          >
            <div
              className={`relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-svh ${
                reverse ? "lg:order-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:py-20">
              <span
                className={`block font-sans text-[11px] font-medium uppercase tracking-[0.4em] ${
                  dark ? "text-silver" : "text-navy/60"
                }`}
              >
                {layer.badge}
              </span>
              <span
                className={`mt-6 block font-script text-[clamp(2.5rem,4.5vw,4rem)] leading-none ${
                  dark ? "text-ivory/55" : "text-navy/55"
                }`}
              >
                {extra}
              </span>
              <h3 className="mt-2 font-display text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.95]">
                {layer.word}
              </h3>
              <p
                className={`mt-6 max-w-sm font-serif text-[clamp(1.25rem,1.9vw,1.875rem)] italic leading-snug ${
                  dark ? "text-ivory/80" : "text-navy/75"
                }`}
              >
                {layer.message}
              </p>
              <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
                {layer.services.map((s) => (
                  <li
                    key={s}
                    className={`px-4 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] ${
                      dark ? "bg-ivory/10" : "bg-navy/8"
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* Image equation: Venue + Enhance + Experience */}
      <div className="flex min-h-[80svh] w-full flex-col justify-center bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-4 lg:gap-8">
            {EXPERIENCE_LAYERS.map((layer, i) => (
              <div key={layer.key} className="contents">
                <figure className="m-0 w-full flex-1">
                  <div className="relative aspect-square w-full overflow-hidden bg-navy-deep">
                    <img
                      src={IMAGES[layer.key].src}
                      alt=""
                      loading="lazy"
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-5 text-center font-display text-[clamp(1.75rem,3.4vw,3.5rem)] leading-none">
                    {layer.word}
                  </figcaption>
                </figure>

                {i < EXPERIENCE_LAYERS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="font-script text-[clamp(3rem,6vw,6rem)] leading-none text-navy/45 sm:mt-[6vw]"
                  >
                    +
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}