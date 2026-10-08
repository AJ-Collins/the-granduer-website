import { Reveal } from "@/components/ui/Reveal";

/** Primary CTAs — same `.end-doors/.ec` language as homepage FinalCTA. */
export function ConversionDoors() {
  return (
    <section className="end" id="book">
      <div className="end-doors">
        <Reveal><a href="#viewing" className="ec ec1"><b className="ec-t">Book a Viewing</b></a></Reveal>
        <Reveal delay={1}><a href="#proposal" className="ec ec2"><b className="ec-t">Request a Proposal</b></a></Reveal>
        <Reveal delay={2}><a href="https://wa.me/YOURNUMBER" target="_blank" rel="noopener" className="ec ec3"><b className="ec-t">WhatsApp Us</b></a></Reveal>
      </div>
    </section>
  );
}
