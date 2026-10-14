import { LAYER_IMAGES } from "./layer-images";

type Layer = { key: string; badge: string; word: string; message: string; services: readonly string[]; extra?: string };

export function ExperienceLayerSplit({ layer, dark, reverse }: { layer: Layer; dark: boolean; reverse: boolean }) {
  const img = LAYER_IMAGES[layer.key];
  const extra = layer.extra ?? "Begin with";
  return (
    <div
      id={`layer-${layer.key}`}
      className={`grid min-h-svh w-full lg:grid-cols-2 ${dark ? "bg-navy text-ivory" : "bg-ivory text-navy"}`}
    >
      <div className={`relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-svh ${reverse ? "lg:order-2" : ""}`}>
        <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:py-20">
        <span className={`block font-sans text-[11px] font-medium uppercase tracking-[0.4em] ${dark ? "text-silver" : "text-navy/60"}`}>
          {layer.badge}
        </span>
        <span className={`mt-6 block font-script text-[clamp(2.5rem,4.5vw,4rem)] leading-none ${dark ? "text-ivory/55" : "text-navy/55"}`}>
          {extra}
        </span>
        <h3 className="mt-2 font-display text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.95]">{layer.word}</h3>
        <p className={`mt-6 max-w-sm font-serif text-[clamp(1.25rem,1.9vw,1.875rem)] italic leading-snug ${dark ? "text-ivory/80" : "text-navy/75"}`}>
          {layer.message}
        </p>
        <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
          {layer.services.map((s) => (
            <li key={s} className={`px-4 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] ${dark ? "bg-ivory/10" : "bg-navy/8"}`}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
