const BG_IMAGE =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=80";

const DOORS = [
  {
    key: "viewing",
    title: "Book a Viewing",
    text: "Walk the hall and see it for yourself.",
    href: "/contact#viewing",
  },
  {
    key: "proposal",
    title: "Request a Proposal",
    text: "Tailored to your date and guest list.",
    href: "/contact#proposal",
  },
  {
    key: "whatsapp",
    title: "WhatsApp Us",
    text: "A quick question? Message us now.",
    href: "https://wa.me/YOURNUMBER",
  },
];

/**
 * Final conversion — full-screen photo with the text on top.
 * Big centred heading, three frosted doors, contact row.
 * lg+: doors side by side. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-10 pt-24 text-ivory md:pt-32"
    >
      {/* Photo */}
      <img
        src={BG_IMAGE}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Navy veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/80 via-navy/55 to-navy-deep/95"
      />

      {/* Heading */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          Choose how you&rsquo;d like to begin
        </span>

        <h2 className="mt-8">
          <span className="block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">
            Your extraordinary
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.92]">
            event starts
          </span>
          <span className="block font-serif text-[clamp(3rem,9vw,8.5rem)] italic leading-[1] text-ivory/80">
            here
          </span>
        </h2>
      </div>

      {/* Doors + contact */}
      <div className="relative z-10 mx-auto mt-14 w-full max-w-[1500px] md:mt-20">
        <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {DOORS.map((door) => (
            <a
              key={door.key}
              href={door.href}
              {...(door.key === "whatsapp"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
              className="group flex items-end justify-between gap-4 bg-ivory/12 p-7 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:p-9"
            >
              <div>
                <b className="block font-display text-[clamp(1.875rem,3vw,2.75rem)] font-normal leading-none">
                  {door.title}
                </b>
                <span className="mt-3 block font-serif text-lg italic leading-snug opacity-80">
                  {door.text}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 font-sans text-3xl transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 font-serif text-xl italic text-ivory/80 sm:flex-row sm:gap-10">
          <a
            href="mailto:concierge@dgrandeur.com"
            className="transition-colors duration-500 hover:text-white"
          >
            concierge@dgrandeur.com
          </a>
          <a
            href="https://wa.me/YOURNUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-500 hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}