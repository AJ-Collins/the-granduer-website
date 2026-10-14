import { eventImage } from "./images";

/**
 * Core story for an event type, full screen.
 * The story line set large, then three staggered photos.
 * lg: 5/4/3 columns, bottom-aligned. Below lg: stacked.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function EventStory({ story }: { story: string }) {
  return (
    <section
      id="story"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            The story
          </span>
          <p className="mx-auto mt-6 max-w-4xl font-serif text-[clamp(1.75rem,3.4vw,3.25rem)] italic leading-[1.2]">
            {story}
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-4">
          <figure className="relative m-0 aspect-[4/3] overflow-hidden bg-navy-deep sm:col-span-2 lg:col-span-5 lg:aspect-[4/5]">
            <img
              src={eventImage(1)}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
          <figure className="relative m-0 aspect-[4/5] overflow-hidden bg-navy-deep lg:col-span-4 lg:aspect-[3/4]">
            <img
              src={eventImage(2)}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
          <figure className="relative m-0 aspect-[4/5] overflow-hidden bg-navy-deep lg:col-span-3 lg:aspect-square">
            <img
              src={eventImage(3)}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}