import { LAYER_IMAGES } from "./layer-images";

type Layer = { key: string; badge: string; word: string; message: string; services: readonly string[]; extra?: string };

export function ExperienceLayerFeature({ layer }: { layer: Layer }) {
  const img = LAYER_IMAGES[layer.key];
  const extra = layer.extra ?? "Begin with";
  return (
    <div
      id={`layer-${layer.key}`}
      className="relative flex min-h-svh w-full items-end justify-center overflow-hidden bg-navy-deep px-[clamp(1.5rem,4vw,5rem)] pb-24 pt-32 text-center text-ivory md:items-center md:pb-24"
    >
      <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/90" />
      <div className="relative z-10 w-full max-w-5xl">
        <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-silver">{layer.badge}</span>
        <span className="mt-6 block font-script text-[clamp(2.75rem,5.5vw,5rem)] leading-none text-ivory/65">{extra}</span>
        <h3 className="mt-2 font-display text-[clamp(3.75rem,13vw,12rem)] font-normal leading-[0.92]">{layer.word}</h3>
        <p className="mx-auto mt-6 max-w-md font-serif text-[clamp(1.25rem,2vw,1.875rem)] italic leading-snug text-ivory/85">
          {layer.message}
        </p>
        <ul className="m-0 mt-10 flex list-none flex-wrap justify-center gap-2 p-0 sm:gap-3">
          {layer.services.map((s) => (
            <li key={s} className="bg-ivory/12 px-4 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur-md sm:px-5">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
