import { SectionHeading } from "@/components/ui/SectionHeading";
import { TRUST_SIGNALS } from "@/lib/about-content";

/** Trust signals — placeholders stay honest until real proof exists. */
export function TrustSignals() {
  return (
    <section className="dg-block" id="trust">
      <SectionHeading title="Why trust us" lede="Proof over promises." />
      <ul>{TRUST_SIGNALS.map((t) => <li key={t.key}>{t.label}</li>)}</ul>
    </section>
  );
}
