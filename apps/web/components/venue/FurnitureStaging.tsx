const BIG = {
  script: "Dressed in",
  name: "Tables",
  line: "Round, long or head table, set to your style.",
  img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=2000&q=80",
  alt: "An elegantly set table in the hall",
};

const SIDE = [
  {
    script: "Seated on",
    name: "Chairs",
    line: "Comfortable, elegant, ready on the day.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    alt: "Rows of styled chairs with floral details",
  },
  {
    script: "Centre",
    name: "Stage",
    line: "A platform for every moment that matters.",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    alt: "A lit stage in the hall",
  },
];

type Tile = {
  script: string;
  name: string;
  line: string;
  img: string;
  alt: string;
};

function Tile({ tile, big = false }: { tile: Tile; big?: boolean }) {
  return (
    <figure className="group relative m-0 h-full w-full overflow-hidden bg-navy-deep">
      <img
        src={tile.img}
        alt={tile.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-10">
        <span className="block font-script text-[clamp(2rem,3vw,3rem)] leading-none text-ivory/70">
          {tile.script}
        </span>
        <b
          className={`mt-1 block font-display font-normal leading-[0.95] ${
            big
              ? "text-[clamp(3.5rem,8vw,7.5rem)]"
              : "text-[clamp(2.5rem,4.5vw,4.5rem)]"
          }`}
        >
          {tile.name}
        </b>
        <span className="mt-4 block max-w-xs font-serif text-[clamp(1.125rem,1.5vw,1.5rem)] italic leading-snug text-ivory/85">
          {tile.line}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Tables, chairs and staging, full screen.
 * One huge image for tables, two stacked for chairs and stage.
 * lg+: 7/5 split filling the screen height. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function FurnitureStaging() {
  return (
    <section
      id="furniture"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-navy px-[clamp(1.5rem,4vw,5rem)] py-20 text-ivory md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center lg:text-left">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/55">
            Everything
          </span>
          <span className="mt-2 block font-serif text-[clamp(3rem,8vw,7.5rem)] italic leading-[1]">
            in its place
          </span>
        </h2>

        {/* Mosaic */}
        <div className="mt-12 grid gap-3 md:mt-16 lg:h-[72svh] lg:grid-cols-12 lg:gap-4">
          <div className="aspect-[4/5] sm:aspect-[3/2] lg:col-span-7 lg:aspect-auto">
            <Tile tile={BIG} big />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
            {SIDE.map((t) => (
              <div
                key={t.name}
                className="aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto"
              >
                <Tile tile={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}