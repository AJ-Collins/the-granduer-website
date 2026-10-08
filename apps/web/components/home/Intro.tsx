import { MISSION } from "@/lib/home-content";

const HALL_IMAGE =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80";
const ARRIVAL_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80";
const HOSPITALITY_IMAGE =
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80";

/**
 * Brand promise, full screen.
 * lg+: huge hall image fills the left 7 columns edge to edge; text and two
 * supporting images sit on the right. Below lg: stacked.
 * Rectangles and squares only. No borders, no lines, no rounding.
 */
export function Intro() {
  return (
    <section
      id="welcome"
      className="grid min-h-svh w-full overflow-hidden bg-ivory text-navy lg:grid-cols-12"
    >
      {/* Big image */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] lg:col-span-7 lg:aspect-auto lg:min-h-svh">
        <img
          src={HALL_IMAGE}
          alt="The main hall at D'Grandeur Event Centre"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Text + supporting images */}
      <div className="flex flex-col justify-center gap-12 px-[clamp(1.5rem,4vw,5rem)] py-16 lg:col-span-5 lg:gap-14 lg:py-20">
        <div>
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            Welcome
          </span>

          <h2 className="mt-4">
            <span className="block font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.95]">
              Beautiful
            </span>
            <span className="block font-serif text-[clamp(2.75rem,6vw,5.5rem)] italic leading-[1.05] text-navy/75">
              spaces,
            </span>
            <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
              thoughtful hospitality
            </span>
          </h2>

          <p className="mt-8 max-w-sm font-sans text-base leading-relaxed text-navy/65">
            {MISSION.statement}
          </p>

          <a
            href="/venue"
            className="mt-10 inline-flex items-center gap-3 bg-navy px-9 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-500 hover:bg-navy-deep"
          >
            Explore the Venue
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Two supporting images: square + landscape rectangle */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          <div className="relative col-span-2 aspect-square overflow-hidden">
            <img
              src={ARRIVAL_IMAGE}
              alt="Arrival at D'Grandeur Event Centre"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative col-span-3 overflow-hidden">
            <img
              src={HOSPITALITY_IMAGE}
              alt="Guest hospitality at D'Grandeur Event Centre"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}