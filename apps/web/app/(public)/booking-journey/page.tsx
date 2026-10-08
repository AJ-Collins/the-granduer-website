import { BookingHero, JourneyCTA, JourneyStages } from "@/components/booking-journey";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
export default function BookingJourneyPage() {
  return (
    <>
    <Navbar />
    <main>
      <BookingHero />
      <JourneyStages />
      <JourneyCTA />
    </main>
    <SiteFooter />
  </>
  );
}
