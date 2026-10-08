import { PACKAGES } from "@/lib/packages-content";

/** Bar widths: each step goes further. Decorative, not a measurement. */
const REACH = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

/**
 * Comparison ladder, full screen.
 * One row per package: name, growing bar, description.
 * lg+: three columns per row. Below lg: stacked per row.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function PackageCompare() {
  return (
    <section
      id="compare"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            Side by side
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95]">
            Compare
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            included, optional enhancements &amp; client-supplied
          </span>
        </h2>

        {/* Ladder */}
        <ul className="m-0 mt-14 grid list-none gap-3 p-0 md:mt-20 md:gap-4">
          {PACKAGES.map((p, i) => (
            <li
              key={p.key}
              className="grid items-center gap-5 bg-navy/6 px-6 py-7 md:px-10 md:py-9 lg:grid-cols-12 lg:gap-10"
            >
              <b className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-none lg:col-span-3">
                {p.word}
              </b>

              <div
                aria-hidden="true"
                className="h-4 w-full bg-navy/10 md:h-5 lg:col-span-4"
              >
                <div className={`h-full bg-navy ${REACH[i]}`} />
              </div>

              <p className="font-serif text-lg italic leading-snug text-navy/75 lg:col-span-5">
                {p.presentation}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}