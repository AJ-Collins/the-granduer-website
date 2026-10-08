import { eventImage } from "./images";

type Service = string | { title?: string; name?: string; label?: string };

const labelOf = (s: Service) =>
  typeof s === "string" ? s : (s.title ?? s.name ?? s.label ?? "");

/**
 * Services for an event type, full screen.
 * One photo tile per service with a number and a name.
 * lg: 3 across. sm: 2 across. Below sm: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function EventServices({ services }: { services: Service[] }) {
  return (
    <section className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-navy px-[clamp(1.5rem,4vw,5rem)] py-20 text-ivory md:py-28">
      <div className="mx-auto w-full max-w-[1800px]">
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-ivory/55">
            Everything for
          </span>
          <span className="mt-2 block font-serif text-[clamp(3rem,8vw,7.5rem)] italic leading-[1]">
            your day
          </span>
        </h2>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-4">
          {services.map((s, i) => (
            <figure
              key={`${labelOf(s)}-${i}`}
              className="group relative m-0 aspect-[4/5] overflow-hidden bg-navy-deep"
            >
              <img
                src={eventImage(i + 2)}
                alt=""
                loading="lazy"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <b className="mt-3 block font-display text-[clamp(1.875rem,2.8vw,3rem)] font-normal leading-[1]">
                  {labelOf(s)}
                </b>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}