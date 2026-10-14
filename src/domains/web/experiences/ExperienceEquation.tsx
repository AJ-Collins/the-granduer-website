import { EXPERIENCE_LAYERS } from "@/shared/lib/experiences-content";
import { LAYER_IMAGES } from "./layer-images";

export function ExperienceEquation() {
  return (
    <div className="flex min-h-[80svh] w-full flex-col justify-center bg-ivory px-[clamp(1.5rem,4vw,5rem)] py-20 text-navy md:py-28">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-4 lg:gap-8">
          {EXPERIENCE_LAYERS.map((layer, i) => (
            <div key={layer.key} className="contents">
              <figure className="m-0 w-full flex-1">
                <div className="relative aspect-square w-full overflow-hidden bg-navy-deep">
                  <img src={LAYER_IMAGES[layer.key].src} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <figcaption className="mt-5 text-center font-display text-[clamp(1.75rem,3.4vw,3.5rem)] leading-none">
                  {layer.word}
                </figcaption>
              </figure>
              {i < EXPERIENCE_LAYERS.length - 1 ? (
                <span aria-hidden="true" className="font-script text-[clamp(3rem,6vw,6rem)] leading-none text-navy/45 sm:mt-[6vw]">
                  +
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
