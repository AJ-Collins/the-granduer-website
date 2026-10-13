import { Navbar } from "@/domains/home/Navbar";
import { Hero } from "@/domains/home/Hero";
import { Intro } from "@/domains/home/Intro";
import { VenueFacts } from "@/domains/home/VenueFacts";
import { CelebrateMosaic } from "@/domains/home/CelebrateMosaic";
import { VenueStack } from "@/domains/home/VenueStack";
import { ExperienceJourney } from "@/domains/home/ExperienceJourney";
import { TransformationsGallery } from "@/domains/home/TransformationsGallery";
import { ExperienceMoments } from "@/domains/home/ExperienceMoments";
import { Testimonials } from "@/domains/home/Testimonials";
import { FinalCTA } from "@/domains/home/FinalCTA";
import { SiteFooter } from "@/domains/home/SiteFooter";

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
