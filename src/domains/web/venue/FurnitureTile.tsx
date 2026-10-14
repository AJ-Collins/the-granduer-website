export type FurnitureTileData = {
  script: string;
  name: string;
  line: string;
  img: string;
  alt: string;
};

export function FurnitureTile({ tile, big = false }: { tile: FurnitureTileData; big?: boolean }) {
  return (
    <figure className="group relative m-0 h-full w-full overflow-hidden bg-navy-deep">
      <img
        src={tile.img}
        alt={tile.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-dg group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-10">
        <span className="block font-script text-[clamp(2rem,3vw,3rem)] leading-none text-ivory/70">
          {tile.script}
        </span>
        <b
          className={`mt-1 block font-display font-normal leading-[0.95] ${
            big
              ? "text-[clamp(3.5rem,8vw,7.5rem)]"
              : "text-[clamp(2.5rem,4.5vw,4.5rem)]"
          }`}
        >
          {tile.name}
        </b>
        <span className="mt-4 block max-w-xs font-serif text-[clamp(1.125rem,1.5vw,1.5rem)] italic leading-snug text-ivory/85">
          {tile.line}
        </span>
      </figcaption>
    </figure>
  );
}
