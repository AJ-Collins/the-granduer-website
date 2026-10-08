import { Reveal } from "@/components/ui/Reveal";

/** Closing CTA — same `.end/.btn solid` language. */
export function JourneyCTA() {
  return (
    <section className="end" id="book">
      <Reveal><a href="/contact#proposal" className="btn solid">Start Your Enquiry</a></Reveal>
    </section>
  );
}
