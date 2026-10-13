import { BookingHero, JourneyCTA, JourneyStages } from "@/domains/booking-journey";
import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
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
