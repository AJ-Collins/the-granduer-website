import { AssetGroups, GalleryCTA, GalleryHero, TransformationsWall } from "@/domains/gallery";
import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <GalleryHero />
        <TransformationsWall />
        <AssetGroups />
        <GalleryCTA />
      </main>
      <SiteFooter />
    </>
  );
}
