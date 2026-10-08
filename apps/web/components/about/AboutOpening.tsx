import { Reveal } from "@/components/ui/Reveal";

/** Opening + positioning + vision/mission — same `.intro ivory` language as homepage Intro. */
export function AboutOpening() {
  return (
    <section className="intro ivory">
      <Reveal><p>Celebrations, corporate gatherings and special occasions.</p></Reveal>
      <Reveal delay={1}><small>Vision and mission live here — genuine, measurable commitments only.</small></Reveal>
    </section>
  );
}
