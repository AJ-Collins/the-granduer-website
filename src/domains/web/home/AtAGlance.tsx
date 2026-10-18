export function AtAGlance() {
  return (
    <section className="w-full bg-[#1c2c3c] px-6 py-20 sm:py-28 md:py-32 text-center text-white">
      <div className="mx-auto max-w-4xl">
        <span className="mb-10 sm:mb-14 block font-script text-2xl sm:text-3xl text-white/70 italic leading-none">
          At a glance
        </span>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          <div>
            <div className="font-display text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-wider text-white">
              1,000
            </div>
            <div className="mt-2.5 font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
              GUEST CAPACITY
            </div>
          </div>

          <div>
            <div className="font-display text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-wider text-white">
              FULL
            </div>
            <div className="mt-2.5 font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
              WIFI &amp; POWER
            </div>
          </div>

          <div>
            <div className="font-display text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-wider text-white">
              EASY
            </div>
            <div className="mt-2.5 font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
              ACCESS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
