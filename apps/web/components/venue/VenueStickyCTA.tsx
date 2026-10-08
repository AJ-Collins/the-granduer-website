/**
 * Sticky CTA: Book a Viewing.
 * md+: fixed bottom-right rectangle. Below md it is hidden, since the
 * Navbar already provides the mobile sticky action bar.
 * Rectangle only. No border, no rounding, no lines.
 */
export function VenueStickyCTA() {
  return (
    <a
      href="/contact#viewing"
      className="group fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[clamp(1.5rem,3vw,3rem)] z-40 hidden items-center gap-4 bg-ivory px-8 py-5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-navy shadow-2xl shadow-navy-deep/40 transition-colors duration-500 hover:bg-white md:flex"
    >
      Book a Viewing
      <span
        aria-hidden="true"
        className="text-base transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}