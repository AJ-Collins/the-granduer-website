type Layout = {
  name: string;
  script: string;
  /** Verified guest count. Leave empty until confirmed. */
  guests: string;
  img: string;
  alt: string;
};

const LAYOUTS: Layout[] = [
  {
    script: "Seated",
    name: "Banquet",
    guests: "",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
    alt: "Round tables set for a banquet dinner",
  },
  {
    script: "Vows",
    name: "Ceremony",
    guests: "",
    img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=80",
    alt: "Rows of chairs set for a ceremony",
  },
  {
    script: "Facing",
    name: "Theatre",
    guests: "",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    alt: "Theatre-style seating facing a stage",
  },
  {
    script: "Standing",
    name: "Cocktail",
    guests: "",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    alt: "Guests mingling at a cocktail reception",
  },
];

/**
 * Capacity and layouts, full screen.
 * Short heading, then four tall layout photos with the name set on the image.
 * lg: four across. sm: two by two. Below sm: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function CapacityLayouts() {
  return (
    <section
      id="capacity"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            Shaped for
          </span>
          <span className="mt-2 block font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.95]">
            every gathering
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            four ways to fill the hall
          </span>
        </h2>

        {/* Layout photos */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-4">
          {LAYOUTS.map((l) => (
            <figure
              key={l.name}
              className="group relative m-0 aspect-[4/5] overflow-hidden bg-navy-deep lg:aspect-auto lg:h-[68svh]"
            >
              <img
                src={l.img}
                alt={l.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-8">
                <span className="block font-script text-[clamp(1.75rem,2.4vw,2.5rem)] leading-none text-ivory/70">
                  {l.script}
                </span>
                <b className="mt-1 block font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-none">
                  {l.name}
                </b>
                {l.guests ? (
                  <span className="mt-4 block font-serif text-xl italic text-ivory/85">
                    up to {l.guests} guests
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}