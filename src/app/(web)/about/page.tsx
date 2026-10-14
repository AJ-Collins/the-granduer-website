import { AboutCTA, AboutHero, AboutOpening, ExperiencePillars, TrustSignals, ValuesTeam } from "@/domains/web/about";
import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
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
