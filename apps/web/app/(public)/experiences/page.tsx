import { ExperienceLayers, ExperiencesCTA, ExperiencesHero } from "@/components/experiences";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
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
