import { BookingHero, JourneyCTA, JourneyStages } from "@/domains/web/booking-journey";
import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
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
