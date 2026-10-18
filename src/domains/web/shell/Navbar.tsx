import { BookViewingLink } from "./book-viewing-link";

export function Navbar() {
  return (
    <header className="w-full bg-[#f4f1ea] text-[#1c2c3c]">
      {/* Top Utility Bar */}
      <div className="border-b border-[#e5e0d8] px-6 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 sm:gap-10 text-[11px] font-sans font-medium text-[#1c2c3c]/85">
          <a
            href="mailto:concierge@dgrandeur.com"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
          >
            <svg
              className="size-3.5 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>concierge@dgrandeur.com</span>
          </a>

          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
          >
            <svg
              className="size-3.5 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <span>WhatsApp: +234 801 234 5678</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="relative px-6 py-4 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl sm:text-2xl font-normal tracking-[0.25em] text-[#1c2c3c] transition-opacity hover:opacity-80"
          >
            D &rsquo; G R A N D E U R
          </a>

          {/* Center Links (Desktop) */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex xl:gap-10"
          >
            {[
              { label: "VENUE", href: "/venue" },
              { label: "EVENTS", href: "/events" },
              { label: "EXPERIENCES", href: "/experiences" },
              { label: "PACKAGES", href: "/packages" },
              { label: "GALLERY", href: "/gallery" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[11px] font-semibold tracking-[0.2em] text-[#1c2c3c] transition-opacity hover:opacity-65"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA (Desktop) */}
          <div className="hidden lg:block">
            <BookViewingLink className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1c2c3c] transition-opacity hover:opacity-65">
              BOOK A VIEWING
            </BookViewingLink>
          </div>

          {/* Mobile Menu Button + Drawer */}
          <details className="group lg:hidden">
            <summary
              aria-label="Toggle navigation menu"
              className="flex cursor-pointer list-none items-center gap-2 py-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#1c2c3c] [&::-webkit-details-marker]:hidden"
            >
              <span>MENU</span>
              <span className="flex w-5 flex-col gap-1" aria-hidden="true">
                <span className="h-0.5 w-full bg-[#1c2c3c] transition-transform duration-300 group-open:translate-y-[6px] group-open:rotate-45" />
                <span className="h-0.5 w-full bg-[#1c2c3c] transition-opacity duration-300 group-open:opacity-0" />
                <span className="h-0.5 w-full bg-[#1c2c3c] transition-transform duration-300 group-open:-translate-y-[6px] group-open:-rotate-45" />
              </span>
            </summary>

            <div className="absolute inset-x-0 top-full z-50 border-b border-[#e5e0d8] bg-[#f4f1ea] px-6 py-6 shadow-xl">
              <nav className="flex flex-col gap-4 text-center">
                {[
                  { label: "VENUE", href: "/venue" },
                  { label: "EVENTS", href: "/events" },
                  { label: "EXPERIENCES", href: "/experiences" },
                  { label: "PACKAGES", href: "/packages" },
                  { label: "GALLERY", href: "/gallery" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-2 font-sans text-xs font-semibold tracking-[0.2em] text-[#1c2c3c] hover:opacity-70"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-4 border-t border-[#e5e0d8] pt-4">
                  <BookViewingLink className="inline-block rounded-full bg-[#1c2c3c] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#f4f1ea]">
                    BOOK A VIEWING
                  </BookViewingLink>
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}