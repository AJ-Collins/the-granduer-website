import { Reveal } from "@/shared/components/ui/Reveal";
import { SectionHeading } from "@/shared/components/ui/SectionHeading";
import { EXPERIENCE_PILLARS } from "@/shared/lib/about-content";

/** The D'Grandeur Experience — same `.facts/.fact` language as VenueFacts. */
export function ExperiencePillars() {
  return (
    <section className="dg-block ivory" style={{ paddingTop: 0 }}>
      <SectionHeading title="The D'Grandeur Experience" lede="Comfort, detail, personal service, dependable delivery." />
      <div className="facts">
        {EXPERIENCE_PILLARS.map((p) => (
          <Reveal key={p.key} className="fact"><b>{p.title}</b><span>{p.line}</span></Reveal>
        ))}
      </div>
    </section>
  );
}
