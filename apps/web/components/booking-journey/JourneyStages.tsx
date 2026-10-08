import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY_STAGES } from "@/lib/booking-journey-content";

/** 11-stage progression — same `.jsec/.jstep` language as homepage journey. */
export function JourneyStages() {
  return (
    <section className="dg-block jsec" id="stages">
      <SectionHeading title="Booking journey" lede="Eleven stages, one team throughout." />
      {JOURNEY_STAGES.map((s, i) => (
        <Reveal key={s.key} className="jstep on">
          <p className="jadd">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="jword">{s.stage}</h3>
          <p className="jline">{s.support}</p>
        </Reveal>
      ))}
    </section>
  );
}
