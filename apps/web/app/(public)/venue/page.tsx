import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ArrivalSecurity, CapacityLayouts, FurnitureStaging, PowerClimate, RoomsFacilities, TechSetup, VenueHero, VenueOverview, VenueResources, VenueStickyCTA } from "@/components/venue";
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
