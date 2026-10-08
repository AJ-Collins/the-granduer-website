import { AboutCTA, AboutHero, AboutOpening, ExperiencePillars, TrustSignals, ValuesTeam } from "@/components/about";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
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
