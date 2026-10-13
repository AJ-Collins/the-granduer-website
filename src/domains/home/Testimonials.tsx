const BG_IMAGE = "/images/home/venue-main.jpg";

const QUOTES = [
  { quote: "A short, real client quote goes here.", name: "Client name", detail: "Wedding" },
  { quote: "Another approved quote about the day goes here.", name: "Client name", detail: "Corporate" },
  { quote: "A third quote about the team and service goes here.", name: "Client name", detail: "Celebration" },
  { quote: "A fourth quote about the hall and the setup goes here.", name: "Client name", detail: "Gala" },
];

/**
 * Testimonials — full-screen photo with the quotes on top.
 * One large feature quote, then the rest in soft frosted rectangles.
 * Static, no JS. Replace placeholders with approved client quotes before
 * launch; hide the section until real quotes exist.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function Testimonials() {
  const [feature, ...rest] = QUOTES;

  return (
    <section
      id="testimonials"
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] py-20 text-ivory md:py-28"
    >
      {/* Photo */}
      <img
        src={BG_IMAGE}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Deep navy veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/60">
            What our
          </span>
          <span className="mt-2 block font-display text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.95]">
            clients say
          </span>
        </h2>

        {/* Feature quote */}
        <figure className="mx-auto mt-12 max-w-5xl text-center md:mt-16">
          <span
            aria-hidden="true"
            className="block font-script text-[clamp(5rem,12vw,10rem)] leading-[0.6] text-ivory/30"
          >
            &ldquo;
          </span>
          <blockquote className="mt-4 font-serif text-[clamp(1.875rem,4.5vw,4rem)] italic leading-[1.15]">
            {feature.quote}
          </blockquote>
          <figcaption className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-silver">
            {feature.name} &nbsp;·&nbsp; {feature.detail}
          </figcaption>
        </figure>

        {/* Other quotes */}
        <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
          {rest.map((card) => (
            <figure
              key={`${card.detail}-${card.quote}`}
              className="m-0 flex min-h-[240px] flex-col justify-between bg-ivory/10 p-7 backdrop-blur-md md:p-9"
            >
              <blockquote className="font-serif text-[clamp(1.375rem,2vw,1.875rem)] italic leading-snug text-ivory/90">
                &ldquo;{card.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <b className="block font-display text-2xl font-normal leading-none">
                  {card.name}
                </b>
                <span className="mt-2 block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-silver">
                  {card.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}