import { MOSAIC_TILES } from "@/lib/home-content";

/**
 * Row patterns on a 12-column grid (lg+). Leftover tiles in the last row
 * stretch to fill it, so the grid never has holes whatever the tile count.
 */
const ROW_PATTERNS = [
  [8, 4],
  [4, 4, 4],
  [4, 8],
  [4, 4, 4],
];

const SPAN_CLASS: Record<number, string> = {
  4: "lg:col-span-4",
  6: "lg:col-span-6",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

function getSpans(count: number): number[] {
  const spans: number[] = [];
  let i = 0;
  let row = 0;
  while (i < count) {
    const pattern = ROW_PATTERNS[row % ROW_PATTERNS.length];
    const left = count - i;
    if (left >= pattern.length) {
      spans.push(...pattern);
      i += pattern.length;
    } else {
      spans.push(...Array(left).fill(12 / left));
      i += left;
    }
    row++;
  }
  return spans;
}

/**
 * "Celebrate your way" — full-width image grid.
 * Mobile: one big photo per row. sm: two per row. lg+: editorial 12-col grid
 * with tall rows. Titles sit on a soft navy fade inside each photo.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function CelebrateMosaic() {
  const spans = getSpans(MOSAIC_TILES.length);

  return (
    <section id="events" className="w-full overflow-hidden bg-ivory text-navy">
      {/* Heading */}
      <div className="flex flex-col gap-6 px-[clamp(1.5rem,4vw,5rem)] pb-10 pt-20 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-28">
        <h2>
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            Celebrate
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95]">
            your way
          </span>
        </h2>
        <p className="max-w-xs font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug text-navy/65">
          Every occasion, one adaptable space.
        </p>
      </div>

      {/* Image grid */}
      <div className="grid gap-3 px-3 pb-3 sm:grid-cols-2 lg:auto-rows-[65svh] lg:grid-cols-12">
        {MOSAIC_TILES.map((tile, i) => (
          <a
            key={tile.key}
            href="/events"
            className={`group relative block aspect-[4/5] overflow-hidden bg-navy-deep sm:max-lg:[&:nth-child(odd):last-child]:col-span-2 lg:aspect-auto ${SPAN_CLASS[spans[i]]}`}
          >
            <img
              src={tile.img}
              alt={tile.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-[1.05]"
            />

            {/* Soft navy fade for legible text */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-ivory md:p-9">
              <div>
                <h3 className="font-display text-[clamp(2.25rem,4vw,4rem)] leading-none">
                  {tile.word}
                </h3>
                <p className="mt-3 max-w-xs font-serif text-lg italic leading-snug text-ivory/80 md:text-xl">
                  {tile.caption}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 font-sans text-2xl text-ivory/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ivory md:text-3xl"
              >
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}