import { AboutCTA, AboutHero, AboutOpening, ExperiencePillars, TrustSignals, ValuesTeam } from "@/domains/about";
import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutOpening />
        <ExperiencePillars />
        <ValuesTeam />
        <TrustSignals />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
