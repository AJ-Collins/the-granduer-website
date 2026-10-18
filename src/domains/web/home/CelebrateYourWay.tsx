export function CelebrateYourWay() {
  return (
    <section className="w-full bg-[#f4f1ea] px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-32 text-center text-[#1c2c3c]">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1c2c3c]">
          Celebrate your way
        </h2>

        <p className="mt-3 font-sans text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#6b7785]">
          Weddings &middot; Celebrations &middot; Corporate &middot; Concerts
        </p>

        {/* 3 Gallery Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <div className="group relative aspect-[16/10] overflow-hidden bg-[#e8e4dc] shadow-xs">
            <img
              src="/images/homepage/gallery-sunflower.jpg"
              alt="Banquet table setting with sunflowers"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="group relative aspect-[16/10] overflow-hidden bg-[#e8e4dc] shadow-xs">
            <img
              src="/images/homepage/gallery-indoor-table.jpg"
              alt="Indoor dining table with elegant glassware and chandelier"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="group relative aspect-[16/10] overflow-hidden bg-[#e8e4dc] shadow-xs">
            <img
              src="/images/homepage/gallery-miami.jpg"
              alt="D'Grandeur event venue exterior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* View Full Gallery Link */}
        <div className="mt-10 sm:mt-12">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#1c2c3c] transition-opacity hover:opacity-70"
          >
            VIEW THE FULL GALLERY <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
