"use client";

import { useState } from "react";

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const BEFORE = u("1519167758481-83f550bb49b3", 2000);
const AFTER = u("1464366400600-7168b8af9bc3", 2000);

type Category = "Weddings" | "Corporate" | "Celebrations";
const FILTERS = ["All", "Weddings", "Corporate", "Celebrations"] as const;
type Filter = (typeof FILTERS)[number];

type Item = { label: string; category: Category; src: string };

const ITEMS: Item[] = [
  { label: "Banquet", category: "Weddings", src: u("1464366400600-7168b8af9bc3") },
  { label: "Ceremony", category: "Weddings", src: u("1469371670807-013ccf25f16a") },
  { label: "Conference", category: "Corporate", src: u("1540575467063-178a50c2df87") },
  { label: "Cocktail", category: "Celebrations", src: u("1511578314322-379afb476865") },
  { label: "Gala dinner", category: "Celebrations", src: u("1478146896981-b80fe463b330") },
  { label: "Awards night", category: "Corporate", src: u("1514525253161-7a46d19cd819") },
  { label: "Reception", category: "Weddings", src: u("1505236858219-8359eb29e329") },
  { label: "Concert", category: "Celebrations", src: u("1470229722913-7c0e2dbbafd3") },
  { label: "Launch event", category: "Corporate", src: u("1492684223066-81342ee5ff30") },
  { label: "Garden ceremony", category: "Weddings", src: u("1519741497674-611481863552") },
  { label: "Birthday", category: "Celebrations", src: u("1513151233558-d860c5398176") },
  { label: "Training day", category: "Corporate", src: u("1531058020387-3be344556be6") },
  { label: "Wedding dinner", category: "Weddings", src: u("1530103862676-de8c9debad1d") },
  { label: "Anniversary", category: "Celebrations", src: u("1519225421980-715cb0215aed") },
  { label: "Town hall", category: "Corporate", src: u("1496417263034-38ec4f0b665a") },
  { label: "Dessert table", category: "Weddings", src: u("1555244162-803834f70033") },
  { label: "Graduation", category: "Celebrations", src: u("1511795409834-ef04bbd61622") },
  { label: "Product showcase", category: "Corporate", src: u("1519167758481-83f550bb49b3", 1200) },
];

/** 7 photos form one 4-column, 3-row block on lg. Repeats every 7. */
const PATTERN = [
  "col-span-2 row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "col-span-2",
  "",
];
const BLOCK = 7;

/**
 * Transformations: before/after, filters, bento wall with Load more.
 * lg: 4-column bento. Below lg: 2 columns, dense packing.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function TransformationsWall() {
  const [filter, setFilter] = useState<Filter>("All");
  const [visible, setVisible] = useState(BLOCK);

  const filtered =
    filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function pick(f: Filter) {
    setFilter(f);
    setVisible(BLOCK);
  }

  return (
    <section
      id="transformations"
      className="w-full overflow-hidden bg-ivory text-navy"
    >
      {/* Before and after */}
      <div className="relative grid min-h-[85svh] w-full md:grid-cols-2">
        {[
          { src: BEFORE, label: "Before styling", alt: "The empty hall before styling" },
          { src: AFTER, label: "After styling", alt: "The same hall, fully styled" },
        ].map((p) => (
          <figure
            key={p.label}
            className="relative m-0 min-h-[50svh] overflow-hidden bg-navy-deep md:min-h-[85svh]"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-transparent to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-10">
              <span className="block font-display text-[clamp(2rem,4vw,4rem)] leading-none">
                {p.label}
              </span>
            </figcaption>
          </figure>
        ))}

        {/* Square arrow between the halves */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 hidden size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ivory font-sans text-2xl text-navy shadow-2xl shadow-navy-deep/40 md:flex"
        >
          →
        </span>
      </div>

      {/* Heading, filters, wall */}
      <div className="px-[clamp(1.5rem,4vw,5rem)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1800px]">
          <h2 className="text-center">
            <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
              One space,
            </span>
            <span className="mt-2 block font-display text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.98]">
              many transformations
            </span>
            <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
              same space, different configurations
            </span>
          </h2>

          {/* Filters */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 md:mt-16 md:gap-3">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pick(f)}
                  className={`px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    active
                      ? "bg-navy text-ivory"
                      : "bg-navy/8 text-navy hover:bg-navy/15"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Bento wall */}
          <div className="mt-10 grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[34vw] md:gap-3 lg:auto-rows-[17vw] lg:grid-cols-4 lg:gap-4 2xl:auto-rows-[300px]">
            {shown.map((item, i) => (
              <figure
                key={`${item.label}-${i}`}
                className={`group relative m-0 overflow-hidden bg-navy-deep ${PATTERN[i % BLOCK]}`}
              >
                <img
                  src={item.src}
                  alt={`${item.label} layout at D'Grandeur Event Centre`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-ivory md:p-6">
                  <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                    {item.category}
                  </span>
                  <b className="mt-1 block font-display text-[clamp(1.25rem,2vw,2rem)] font-normal leading-none">
                    {item.label}
                  </b>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-12 flex flex-col items-center gap-5 md:mt-16">
            <p
              className="m-0 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-navy/60"
              aria-live="polite"
            >
              Showing {shown.length} of {filtered.length}
            </p>
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisible((v) => v + BLOCK)}
                className="bg-navy px-12 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-500 hover:bg-navy-deep"
              >
                Load more
              </button>
            ) : (
              <span className="font-serif text-xl italic text-navy/70">
                That&rsquo;s every transformation, for now.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}