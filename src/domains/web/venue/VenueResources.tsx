import { ResourceTile } from "./ResourceTile";

const TOUR = {
  script: "Step inside",
  name: "Virtual Tour",
  cta: "Explore",
  href: "#", // TODO: virtual tour link
  img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=2200&q=80",
  alt: "The hall, ready to explore",
};

const SIDE = [
  {
    script: "Take home",
    name: "Spec Sheet",
    cta: "Download",
    href: "#", // TODO: spec sheet / brochure PDF
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    alt: "A venue brochure and spec sheet",
  },
  {
    script: "See the",
    name: "Floorplan",
    cta: "View",
    href: "#", // TODO: floorplan PDF or image
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    alt: "An architectural floorplan",
  },
];

/** Resources and tour. */
export function VenueResources() {
  return (
    <section
      id="resources"
      className="flex min-h-svh w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Heading */}
        <h2 className="text-center">
          <span className="block font-script text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-navy/55">
            See it for
          </span>
          <span className="mt-2 block font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95]">
            yourself
          </span>
          <span className="mt-6 block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60 sm:text-xs">
            resources &amp; tour
          </span>
        </h2>

        {/* Mosaic */}
        <div className="mt-12 grid gap-3 md:mt-16 lg:h-[72svh] lg:grid-cols-12 lg:gap-4">
          <div className="aspect-[4/5] sm:aspect-[3/2] lg:col-span-8 lg:aspect-auto">
            <ResourceTile tile={TOUR} big />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
            {SIDE.map((t) => (
              <div key={t.name} className="aspect-[4/3] lg:aspect-auto">
                <ResourceTile tile={t} trackDownload />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}