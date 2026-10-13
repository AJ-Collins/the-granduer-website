import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
import { ArrivalSecurity, CapacityLayouts, FurnitureStaging, PowerClimate, RoomsFacilities, TechSetup, VenueHero, VenueOverview, VenueResources, VenueStickyCTA } from "@/domains/venue";
export default function VenuePage() {
  return (
    <>
      <Navbar />
      <main>
        <VenueHero />
        <VenueOverview />
        <CapacityLayouts />
        <FurnitureStaging />
        <PowerClimate />
        <ArrivalSecurity />
        <RoomsFacilities />
        <TechSetup />
        <VenueResources />
        <VenueStickyCTA />
      </main>
      <SiteFooter />
    </>
);
}
