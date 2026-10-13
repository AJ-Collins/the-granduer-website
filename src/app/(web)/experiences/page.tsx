import { ExperienceLayers, ExperiencesCTA, ExperiencesHero } from "@/domains/experiences";
import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
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
