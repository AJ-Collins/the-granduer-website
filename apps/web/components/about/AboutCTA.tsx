import { Reveal } from "@/components/ui/Reveal";

/** CTA to venue or viewing — same `.end/.btn` language. */
export function AboutCTA() {
  return (
    <section className="end" id="book">
      <Reveal><a href="/venue" className="btn">Explore the Venue</a></Reveal>
      <Reveal delay={1}><a href="/contact#viewing" className="btn solid">Book a Viewing</a></Reveal>
    </section>
  );
}
