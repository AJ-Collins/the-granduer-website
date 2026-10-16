import { ConversionDoorBody } from "./conversion-door-body";
import { WhatsappLink } from "./whatsapp-link";

const DOORS = [
  {
    key: "viewing",
    script: "Come and",
    title: "Book a Viewing",
    line: "Walk the hall and see it for yourself.",
    href: "#viewing",
    external: false,
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "proposal",
    script: "Tailored",
    title: "Request a Proposal",
    line: "Shaped around your date and guest list.",
    href: "#proposal",
    external: false,
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "whatsapp",
    script: "Just ask",
    title: "WhatsApp Us",
    line: "A quick question? Message us now.",
    href: "https://wa.me/YOURNUMBER",
    external: true,
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  },
];

/** * Contact page opener, full screen. */
export function ConversionDoors() {
  return (
    <section
      id="book"
      className="relative grid min-h-svh w-full overflow-hidden bg-navy-deep text-ivory lg:grid-cols-3"
    >
      {/* Heading over the photos */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6 text-center md:top-32">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
          Choose how you&rsquo;d like to begin
        </span>
        <span className="mt-4 block font-script text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ivory [text-shadow:0_2px_28px_rgba(19,30,42,0.6)]">
          Let&rsquo;s talk
        </span>
      </div>

      {DOORS.map((d) =>
        d.key === "whatsapp" ? (
          <WhatsappLink
            key={d.key}
            href={d.href}
            className="group relative flex min-h-[62svh] items-end overflow-hidden lg:min-h-svh"
          >
            <ConversionDoorBody door={{ ...d, eager: false }} />
          </WhatsappLink>
        ) : (
          <a
            key={d.key}
            href={d.href}
            className="group relative flex min-h-[62svh] items-end overflow-hidden lg:min-h-svh"
          >
            <ConversionDoorBody door={{ ...d, eager: d.key === "viewing" }} />
          </a>
        ),
      )}
    </section>
  );
}