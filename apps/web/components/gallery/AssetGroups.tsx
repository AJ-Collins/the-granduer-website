"use client";

import { useState } from "react";
import { GALLERY_GROUPS } from "@/lib/gallery-content";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=75`;

/** One placeholder photo per group, in order. */
const IMAGES = [
  u("1496417263034-38ec4f0b665a"),
  u("1519167758481-83f550bb49b3"),
  u("1530103862676-de8c9debad1d"),
  u("1519225421980-715cb0215aed"),
  u("1478146896981-b80fe463b330"),
  u("1540575467063-178a50c2df87"),
  u("1514525253161-7a46d19cd819"),
  u("1531058020387-3be344556be6"),
  u("1555244162-803834f70033"),
  u("1492684223066-81342ee5ff30"),
];

const PAGE_SIZE = 4;

/**
 * Shot list with numbered pagination, full screen.
 * lg+: heading and big page counter left, 2x2 photo cards and pager right.
 * Below lg: stacked.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function AssetGroups() {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(GALLERY_GROUPS.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const items = GALLERY_GROUPS.slice(start, start + PAGE_SIZE);

  function go(next: number) {
    setPage(next);
    document
      .getElementById("assets")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="assets"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-navy px-[clamp(1.5rem,4vw,5rem)] py-20 text-ivory md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1800px] gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Heading + counter */}
        <div className="lg:col-span-4">
          <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
            Shot list
          </span>
          <h2 className="mt-6">
            <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/55">
              Everything
            </span>
            <span className="mt-2 block font-serif text-[clamp(3rem,6vw,5.5rem)] italic leading-[1]">
              we capture
            </span>
          </h2>
          <p className="mt-6 max-w-xs font-sans text-xs uppercase tracking-[0.3em] text-ivory/60">
            Minimum requirement per asset
          </p>

          <p
            className="mt-10 hidden font-display text-[clamp(4rem,8vw,8rem)] leading-none lg:block"
            aria-live="polite"
          >
            {pad(page)}
            <span className="text-ivory/35"> / {pad(pages)}</span>
          </p>
        </div>

        {/* Cards + pager */}
        <div className="lg:col-span-8">
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:gap-4">
            {items.map((g, i) => (
              <li
                key={g.key}
                className="group relative aspect-[4/3] overflow-hidden bg-navy-deep"
              >
                <img
                  src={IMAGES[(start + i) % IMAGES.length]}
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/30"
                />

                <span className="absolute left-5 top-5 bg-ivory/15 px-3 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.25em] backdrop-blur-md md:left-7 md:top-7">
                  {g.use}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <b className="block font-display text-[clamp(1.75rem,2.6vw,2.75rem)] font-normal leading-none">
                    {g.asset}
                  </b>
                  <span className="mt-3 block font-serif text-base italic leading-snug text-ivory/80 md:text-lg">
                    {g.requirement}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <nav
            aria-label="Shot list pages"
            className="mt-8 flex items-center justify-between gap-3 md:mt-10"
          >
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page === 1}
              className="bg-ivory/12 px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-ivory hover:text-navy disabled:pointer-events-none disabled:opacity-35"
            >
              ← Prev
            </button>

            <ul className="m-0 flex list-none items-center gap-2 p-0">
              {Array.from({ length: pages }, (_, n) => n + 1).map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    onClick={() => go(n)}
                    aria-label={`Page ${n}`}
                    aria-current={n === page ? "page" : undefined}
                    className={`flex size-12 items-center justify-center font-sans text-[12px] font-semibold transition-colors duration-500 ${
                      n === page
                        ? "bg-ivory text-navy"
                        : "bg-ivory/12 hover:bg-ivory/25"
                    }`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={page === pages}
              className="bg-ivory/12 px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-ivory hover:text-navy disabled:pointer-events-none disabled:opacity-35"
            >
              Next →
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}