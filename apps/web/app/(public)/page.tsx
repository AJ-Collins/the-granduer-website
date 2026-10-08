import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { VenueFacts } from "@/components/home/VenueFacts";
import { CelebrateMosaic } from "@/components/home/CelebrateMosaic";
import { VenueStack } from "@/components/home/VenueStack";
import { ExperienceJourney } from "@/components/home/ExperienceJourney";
import { TransformationsGallery } from "@/components/home/TransformationsGallery";
import { ExperienceMoments } from "@/components/home/ExperienceMoments";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SiteFooter } from "@/components/home/SiteFooter";

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
