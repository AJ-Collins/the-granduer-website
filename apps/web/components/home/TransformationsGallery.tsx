const PHOTOS = [
  { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80", alt: "Wedding ceremony setup", label: "Wedding ceremony" },
  { img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=80", alt: "Wedding reception tables", label: "Reception tables" },
  { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=80", alt: "Gala dinner setup", label: "Gala dinner" },
  { img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80", alt: "Reception toast", label: "The toast" },
  { img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1800&q=80", alt: "Concert stage setup", label: "Concert stage" },
  { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80", alt: "Celebration crowd", label: "Celebration" },
  { img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=80", alt: "Evening reception setup", label: "Evening reception" },
  { img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=80", alt: "Gathering in the hall", label: "Gathering" },
];

/** 12-column row patterns (lg+). Leftover tiles stretch to fill the last row. */
const ROW_PATTERNS = [
  [7, 5],
  [4, 4, 4],
  [4, 4, 4],
  [5, 7],
];

const SPAN_CLASS: Record<number, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
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
      const each = 12 / left;
      spans.push(...Array(left).fill(each));
      i += left;
    }
    row++;
  }
  return spans;
}

/**
 * "One space, many transformations" — edge-to-edge photo wall, ivory.
 * Mobile: 2-column grid. lg+: editorial 12-column rows, each 55svh tall.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function TransformationsGallery() {
  const spans = getSpans(PHOTOS.length);

  return (
    <section id="gallery" className="w-full overflow-hidden bg-ivory text-navy">
      {/* Heading */}
      <div className="flex flex-col gap-6 px-[clamp(1.5rem,4vw,5rem)] pb-10 pt-20 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-28">
        <h2>
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            One space,
          </span>
          <span className="mt-2 block font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]">
            many transformations
          </span>
        </h2>
        <p className="max-w-xs font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug text-navy/65">
          The same hall, styled for every occasion.
        </p>
      </div>

      {/* Photo wall */}
      <div className="grid grid-cols-2 gap-2 px-2 pb-2 sm:gap-3 sm:px-3 sm:pb-3 lg:auto-rows-[55svh] lg:grid-cols-12">
        {PHOTOS.map((photo, i) => (
          <figure
            key={photo.label}
            className={`group relative m-0 aspect-[3/4] overflow-hidden bg-navy-deep max-lg:[&:nth-child(odd):last-child]:col-span-2 lg:aspect-auto ${SPAN_CLASS[spans[i]]}`}
          >
            <img
              src={photo.img}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg italic text-ivory sm:p-6 sm:text-2xl">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Closing link */}
      <div className="flex justify-center px-6 py-14 md:py-20">
        <a
          href="/gallery"
          className="bg-navy px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-500 hover:bg-navy-deep"
        >
          View the full gallery
        </a>
      </div>
    </section>
  );
}