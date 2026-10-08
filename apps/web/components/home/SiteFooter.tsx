import { NAV_LINKS } from "@/lib/home-content";

const STRIP = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=75",
    alt: "The hall at D'Grandeur Event Centre",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=75",
    alt: "Tables set for a celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=75",
    alt: "A celebration in full swing",
  },
  {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1000&q=75",
    alt: "A wedding reception",
  },
];

/**
 * Site footer, deep navy. Photo strip, lockup, one line of copy, main links,
 * legal row. Bottom padding on small screens clears the fixed mobile action bar.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function SiteFooter() {
  return (
    <footer className="w-full bg-navy-deep text-ivory">
      {/* Photo strip: 2 across on phones, 4 across from sm */}
      <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-4">
        {STRIP.map((s) => (
          <div
            key={s.alt}
            className="group relative aspect-square overflow-hidden bg-navy sm:aspect-[3/4] lg:aspect-auto lg:h-[45svh]"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="px-[clamp(1.5rem,4vw,5rem)] pb-32 pt-16 md:pb-12 md:pt-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* Brand */}
            <div className="lg:col-span-6">
              <img
                src="/brand/dg-lockup-ivory.svg"
                alt="D'Grandeur Event Centre"
                className="h-auto w-[min(80vw,340px)] sm:w-[400px]"
              />
              <p className="mt-8 max-w-sm font-serif text-[clamp(1.25rem,2vw,1.625rem)] italic leading-snug text-ivory/70">
                Beautifully designed spaces, thoughtful hospitality and dependable
                event services.
              </p>
            </div>

            {/* Links */}
            <nav aria-label="Footer" className="lg:col-span-3">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-silver">
                Explore
              </span>
              <ul className="mt-6 space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-display text-2xl text-ivory/85 transition-colors duration-500 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="lg:col-span-3">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-silver">
                Begin
              </span>
              <ul className="mt-6 space-y-3">
                <li>
                  <a
                    href="/contact#viewing"
                    className="font-display text-2xl text-ivory/85 transition-colors duration-500 hover:text-white"
                  >
                    Book a Viewing
                  </a>
                </li>
                <li>
                  <a
                    href="/contact#proposal"
                    className="font-display text-2xl text-ivory/85 transition-colors duration-500 hover:text-white"
                  >
                    Request a Proposal
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:concierge@dgrandeur.com"
                    className="block pt-3 font-sans text-sm tracking-wide text-silver transition-colors duration-500 hover:text-white"
                  >
                    concierge@dgrandeur.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal row */}
          <div className="mt-16 flex flex-col gap-4 font-sans text-xs tracking-wide text-silver/80 md:mt-24 md:flex-row md:items-center md:justify-between">
            <span>© 2026 D&rsquo;Grandeur Event Centre</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href="/privacy" className="transition-colors duration-500 hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/cookies" className="transition-colors duration-500 hover:text-white">
                  Cookies
                </a>
              </li>
              <li>
                <a href="/terms" className="transition-colors duration-500 hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}