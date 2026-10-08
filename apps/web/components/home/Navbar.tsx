import { NAV_LINKS } from "@/lib/home-content";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
        <path d="M14 8.5V7c0-.7.3-1 1-1h2V3h-3c-2.8 0-4 1.7-4 4v1.5H8V12h2v9h4v-9h2.7l.5-3.5H14z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
        <path d="M16.6 3h-3v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.6 5.6 0 1 0 4.8 5.5V8.6a6.6 6.6 0 0 0 3.8 1.2V6.8A3.8 3.8 0 0 1 16.6 3z" />
      </svg>
    ),
  },
];

/**
 * Fixed Midnight Navy bar.
 * - lg and up: logo left, links centred, socials + CTA right.
 * - below lg: logo + Menu button; full-width panel opens under the bar.
 * - below md: a slim sticky Book a Viewing / WhatsApp bar sits at the bottom.
 * No client JS: the menu is a <details> element.
 */
export function Navbar() {
  return (
    <>
      <header
        id="nav"
        className="fixed inset-x-0 top-0 z-50 bg-navy/85 backdrop-blur-xl"
      >
        <div className="mx-auto grid h-16 w-full max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-4 px-[clamp(1.25rem,4vw,5rem)] sm:h-20 sm:gap-6">
          {/* Logo + brand name */}
          <a
            href="/"
            aria-label="D'Grandeur Event Centre — Home"
            className="flex items-center gap-3 sm:gap-4"
          >
            <img
              src="/brand/dg-monogram-ivory.svg"
              alt=""
              className="h-9 w-auto sm:h-11"
            />
            <span className="flex flex-col leading-none text-ivory">
              <span className="font-display text-[1.375rem] sm:text-[1.75rem]">
                D&rsquo;Grandeur
              </span>
              <span className="mt-1.5 hidden font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-silver sm:block">
                Event Centre
              </span>
            </span>
          </a>

          {/* Centre links (desktop) */}
          <nav
            aria-label="Main"
            className="hidden items-center justify-center gap-8 lg:flex xl:gap-12"
          >
            {NAV_LINKS.slice(0, 5).map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="py-2 font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors duration-500 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="col-start-3 flex items-center gap-5 xl:gap-7">
            <ul className="hidden items-center gap-5 xl:flex">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="text-ivory/70 transition-colors duration-500 hover:text-white"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/contact#viewing"
              className="hidden bg-ivory px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-500 hover:bg-white md:inline-block"
            >
              Book a Viewing
            </a>

            <details className="group lg:hidden">
              <summary
                aria-label="Open menu"
                className="flex cursor-pointer list-none items-center gap-3 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-ivory [&::-webkit-details-marker]:hidden"
              >
                Menu
                <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
                  <span className="h-px w-full bg-ivory transition-transform duration-300 group-open:translate-y-[3.5px] group-open:rotate-45" />
                  <span className="h-px w-full bg-ivory transition-transform duration-300 group-open:-translate-y-[3.5px] group-open:-rotate-45" />
                </span>
              </summary>

              {/* Full-width panel under the bar */}
              <div
                role="dialog"
                aria-label="Menu"
                className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto bg-navy-deep px-[clamp(1.25rem,4vw,5rem)] pb-28 pt-4 sm:max-h-[calc(100svh-5rem)]"
              >
                <ul className="mx-auto max-w-3xl">
                  {NAV_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="flex items-baseline justify-between py-5 font-display text-4xl text-ivory transition-colors duration-300 hover:text-white sm:text-5xl"
                      >
                        {l.label}
                        <small className="font-sans text-[10px] font-normal uppercase tracking-[0.25em] text-silver">
                          {l.menuNote}
                        </small>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
                  <a
                    href="/contact#viewing"
                    className="bg-ivory px-6 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy"
                  >
                    Book a Viewing
                  </a>
                  <a
                    href="/contact#proposal"
                    className="bg-ivory/10 px-6 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory"
                  >
                    Request a Proposal
                  </a>
                </div>

                <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between">
                  <p className="font-sans text-xs tracking-wide text-silver">
                    concierge@dgrandeur.com
                  </p>
                  <ul className="flex items-center gap-5 text-ivory/80">
                    {SOCIALS.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} aria-label={s.label}>
                          {s.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-navy/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <a
          href="/contact#viewing"
          className="flex-1 bg-ivory py-3.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy"
        >
          Book a Viewing
        </a>
        <a
          href="#"
          aria-label="WhatsApp us"
          className="bg-ivory/15 px-5 py-3.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}