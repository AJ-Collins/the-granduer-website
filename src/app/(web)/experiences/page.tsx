import { ExperienceLayers, ExperiencesCTA, ExperiencesHero } from "@/domains/web/experiences";
import { Navbar } from "@/domains/web/shell/Navbar";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";
export default function ExperiencesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ExperiencesHero />
        <ExperienceLayers />
        <ExperiencesCTA />
      </main>
      <SiteFooter />
    </>
  );
}
