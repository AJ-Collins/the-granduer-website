import { EVENTS } from "@/lib/events-content";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
import { eventImage } from "@/components/events/images";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=75";

/**
 * Events index. Short header with a full-background hero image,
 * followed by one full-width photo band per event.
 *
 * Rectangles only. No borders, no lines, no rounding.
 */
export default function EventsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Events hero */}
        <section className="relative flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden bg-navy px-[clamp(1.5rem,4vw,5rem)] pb-16 pt-32 text-center text-ivory">
          {/* Background image */}
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Navy overlay for text readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-navy/55"
          />

          {/* Existing hero content */}
          <span className="relative z-10 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
            Events at D&rsquo;Grandeur
          </span>

          <h1 className="relative z-10 mt-8">
            <span className="block font-script text-[clamp(2.75rem,6vw,5.5rem)] leading-none text-ivory/60">
              Every kind of
            </span>

            <span className="mt-2 block font-display text-[clamp(3.75rem,12vw,11rem)] leading-[0.92]">
              celebration
            </span>
          </h1>
        </section>

        {/* Event image bands */}
        <section className="grid w-full gap-1 bg-navy-deep">
          {EVENTS.map((e, i) => (
            <a
              key={e.slug}
              href={`/events/${e.slug}`}
              className="group relative flex min-h-[70svh] w-full items-end overflow-hidden bg-navy-deep text-ivory lg:min-h-[85svh]"
            >
              {/* Event background image */}
              <img
                src={eventImage(i)}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/20 to-navy-deep/35"
              />

              {/* Event title and link */}
              <div className="relative z-10 flex w-full items-end justify-between gap-6 px-[clamp(1.5rem,4vw,5rem)] pb-12 md:pb-16">
                <div>
                  <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <b className="mt-3 block font-display text-[clamp(3.25rem,10vw,9.5rem)] font-normal leading-[0.92]">
                    {e.title}
                  </b>
                </div>

                <span className="shrink-0 pb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory/85 transition-transform duration-500 group-hover:translate-x-1">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}