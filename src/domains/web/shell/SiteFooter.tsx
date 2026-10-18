export function SiteFooter() {
  return (
    <footer className="w-full bg-[#f4f1ea] border-t border-[#e8e4dc] px-6 sm:px-12 lg:px-20 py-8 sm:py-10 text-[#4b5866]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row text-xs sm:text-sm font-sans">
        <span>&copy; 2026 D&rsquo;Grandeur Event Centre</span>
        <a
          href="mailto:concierge@dgrandeur.com"
          className="transition-colors hover:text-[#1c2c3c]"
        >
          concierge@dgrandeur.com
        </a>
      </div>
    </footer>
  );
}