export type ConversionDoor = {
  key: string;
  script: string;
  title: string;
  line: string;
  img: string;
  eager?: boolean;
};

export function ConversionDoorBody({ door }: { door: ConversionDoor }) {
  return (
    <>
      <img
        src={door.img}
        alt=""
        loading={door.eager ? "eager" : "lazy"}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-dg group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/55 transition-colors duration-500 group-hover:from-navy-deep/80"
      />
      <div className="relative z-10 flex w-full items-end justify-between gap-4 p-7 pb-12 md:p-10 md:pb-16">
        <div>
          <span className="block font-script text-[clamp(2rem,3vw,3rem)] leading-none text-ivory/70">
            {door.script}
          </span>
          <b className="mt-1 block font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-normal leading-[0.95]">
            {door.title}
          </b>
          <span className="mt-4 block max-w-xs font-serif text-lg italic leading-snug text-ivory/80">
            {door.line}
          </span>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 pb-1 font-sans text-3xl transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </>
  );
}
