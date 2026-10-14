import { Navbar } from "@/domains/web/home/Navbar";
import { Hero } from "@/domains/web/home/Hero";
import { Intro } from "@/domains/web/home/Intro";
import { VenueFacts } from "@/domains/web/home/VenueFacts";
import { CelebrateMosaic } from "@/domains/web/home/CelebrateMosaic";
import { VenueStack } from "@/domains/web/home/VenueStack";
import { ExperienceJourney } from "@/domains/web/home/ExperienceJourney";
import { TransformationsGallery } from "@/domains/web/home/TransformationsGallery";
import { ExperienceMoments } from "@/domains/web/home/ExperienceMoments";
import { Testimonials } from "@/domains/web/home/Testimonials";
import { FinalCTA } from "@/domains/web/home/FinalCTA";
import { SiteFooter } from "@/domains/web/home/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <VenueFacts />
        <CelebrateMosaic />
        <VenueStack />
        <ExperienceJourney />
        <TransformationsGallery />
        <ExperienceMoments />
        <Testimonials />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
