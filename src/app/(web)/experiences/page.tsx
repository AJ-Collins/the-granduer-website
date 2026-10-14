import { ExperienceLayers, ExperiencesCTA, ExperiencesHero } from "@/domains/web/experiences";
import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
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
