const TOUR = {
  script: "Step inside",
  name: "Virtual Tour",
  cta: "Explore",
  href: "#", // TODO: virtual tour link
  img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=2200&q=80",
  alt: "The hall, ready to explore",
};

const SIDE = [
  {
    script: "Take home",
    name: "Spec Sheet",
    cta: "Download",
    href: "#", // TODO: spec sheet / brochure PDF
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    alt: "A venue brochure and spec sheet",
  },
  {
    script: "See the",
    name: "Floorplan",
    cta: "View",
    href: "#", // TODO: floorplan PDF or image
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    alt: "An architectural floorplan",
  },
];

type Tile = {
  script: string;
  name: string;
  cta: string;
  href: string;
  img: string;
  alt: string;
};

function ResourceTile({ tile, big = false }: { tile: Tile; big?: boolean }) {
  return (
    <a
      href={tile.href}
      className="group relative block h-full w-full overflow-hidden bg-navy-deep text-ivory"
    >
      <img
        src={tile.img}
        alt={tile.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/15 to-navy-deep/25"
      />

      {/* Square play button (tour only) */}
      {big ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[42%] flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ivory/20 backdrop-blur-md transition-colors duration-500 group-hover:bg-ivory group-hover:text-navy md:size-24"
        >
          <svg viewBox="0 0 24 24" className="size-7 md:size-8" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
        <div>
          <span className="block font-script text-[clamp(2rem,3vw,3rem)] leading-none text-ivory/70">
            {tile.script}
          </span>
          <b
            className={`mt-1 block font-display font-normal leading-[0.95] ${
              big
                ? "text-[clamp(3rem,7vw,6.5rem)]"
                : "text-[clamp(2.25rem,3.6vw,3.75rem)]"
            }`}
          >
            {tile.name}
          </b>
        </div>
        <span className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory/85 transition-transform duration-500 group-hover:translate-x-1">
          {tile.cta} <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}

/**
 * Resources and tour, full screen.
 * Short heading, then one huge virtual-tour photo with two stacked photos
 * for the spec sheet and floorplan.
 * lg+: 8/4 split filling the screen. Below lg: stacked.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function VenueResources() {
  return (
    <section
      id="resources"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            See it for
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95]">
            yourself
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            resources &amp; tour
          </span>
        </h2>

        {/* Mosaic */}
        <div className="mt-12 grid gap-3 md:mt-16 lg:h-[72svh] lg:grid-cols-12 lg:gap-4">
          <div className="aspect-[4/5] sm:aspect-[3/2] lg:col-span-8 lg:aspect-auto">
            <ResourceTile tile={TOUR} big />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
            {SIDE.map((t) => (
              <div key={t.name} className="aspect-[4/3] lg:aspect-auto">
                <ResourceTile tile={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}