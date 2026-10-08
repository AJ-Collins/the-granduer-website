const BIG_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80";

const ROWS = [
  {
    script: "Sound &",
    name: "Light",
    line: "AV that makes every moment land.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
    alt: "Stage lighting and sound equipment",
  },
  {
    script: "Your",
    name: "Suppliers",
    line: "Easy access for the people you trust.",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=700&q=80",
    alt: "Suppliers preparing food and decor",
  },
  {
    script: "Smooth",
    name: "Setup",
    line: "A clear plan from first load-in to last light.",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
    alt: "A team setting up an event",
  },
];

/**
 * Tech and setup, full screen.
 * lg+: huge photo fills the left half edge to edge; heading and three
 * square-photo rows sit on the right. Below lg: stacked, photo first.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function TechSetup() {
  return (
    <section
      id="tech"
      className="grid min-h-svh w-full overflow-hidden bg-navy text-ivory lg:grid-cols-2"
    >
      {/* Big image */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-svh">
        <img
          src={BIG_IMAGE}
          alt="Stage lights over the hall"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy-deep/60 via-transparent to-transparent"
        />
      </div>

      {/* Heading + rows */}
      <div className="flex flex-col justify-center gap-12 px-[clamp(1.5rem,5vw,6rem)] py-16 lg:gap-14 lg:py-20">
        <h2>
          <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
            Tech &amp; setup
          </span>
          <span className="mt-6 block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/55">
            Ready when
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.95]">
            you are
          </span>
        </h2>

        <ul className="m-0 grid list-none gap-3 p-0 sm:gap-4">
          {ROWS.map((r) => (
            <li
              key={r.name}
              className="group grid grid-cols-[clamp(5.5rem,12vw,9rem)_1fr] items-center gap-5 bg-ivory/8 transition-colors duration-500 hover:bg-ivory/15 sm:gap-8"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={r.img}
                  alt={r.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
                />
              </div>
              <div className="py-4 pr-5 sm:pr-8">
                <span className="block font-script text-[clamp(1.5rem,2vw,2rem)] leading-none text-ivory/65">
                  {r.script}
                </span>
                <b className="mt-1 block font-display text-[clamp(1.875rem,3vw,3rem)] font-normal leading-none">
                  {r.name}
                </b>
                <span className="mt-2 hidden font-serif text-lg italic leading-snug text-ivory/75 sm:block">
                  {r.line}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}