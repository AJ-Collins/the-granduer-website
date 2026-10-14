import { EXPERIENCE_LAYERS } from "@/shared/lib/experiences-content";
import { ExperienceEquation } from "./ExperienceEquation";
import { ExperienceLayerFeature } from "./ExperienceLayerFeature";
import { ExperienceLayerSplit } from "./ExperienceLayerSplit";

/** Three layers as a story of progression. */
export function ExperienceLayers() {
  return (
    <section id="layers" className="w-full overflow-hidden">
      {EXPERIENCE_LAYERS.map((layer, i) => {
        if (i === 2) return <ExperienceLayerFeature key={layer.key} layer={layer} />;
        return <ExperienceLayerSplit key={layer.key} layer={layer} dark={i === 1} reverse={i === 1} />;
      })}
      <ExperienceEquation />
    </section>
  );
}
