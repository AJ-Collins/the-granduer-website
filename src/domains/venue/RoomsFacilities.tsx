const ROOMS = [
  {
    script: "Prepare in",
    name: "Green Room",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=80",
    alt: "A bright dressing room with mirror lights",
    span: "lg:col-span-7",
  },
  {
    script: "Relax in",
    name: "VIP",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    alt: "A refined VIP lounge",
    span: "lg:col-span-5",
  },
  {
    script: "Fresh &",
    name: "Restrooms",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80",
    alt: "Clean, modern restrooms",
    span: "lg:col-span-5",
  },
  {
    script: "Open to",
    name: "Everyone",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    alt: "A step-free, welcoming entrance",
    span: "lg:col-span-7",
  },
];

/**
 * Rooms and facilities, full screen.
 * Short heading over a staggered 2x2 photo mosaic (7/5 then 5/7).
 * lg+: two rows filling the screen. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function RoomsFacilities() {
  return (
    <section
      id="rooms"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            Every detail
          </span>
          <span className="mt-2 block font-serif text-[clamp(3rem,8vw,7.5rem)] italic leading-[1]">
            considered
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            rooms &amp; facilities
          </span>
        </h2>

        {/* Mosaic */}
        <div className="mt-12 grid gap-3 md:mt-16 lg:grid-cols-12 lg:gap-4">
          {ROOMS.map((r) => (
            <figure
              key={r.name}
              className={`group relative m-0 aspect-[4/3] overflow-hidden bg-navy-deep lg:aspect-auto lg:h-[40svh] ${r.span}`}
            >
              <img
                src={r.img}
                alt={r.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/10 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-8">
                <span className="block font-script text-[clamp(1.75rem,2.4vw,2.5rem)] leading-none text-ivory/70">
                  {r.script}
                </span>
                <b className="mt-1 block font-display text-[clamp(2.25rem,4vw,4rem)] font-normal leading-none">
                  {r.name}
                </b>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}