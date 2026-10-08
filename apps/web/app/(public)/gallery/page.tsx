import { AssetGroups, GalleryCTA, GalleryHero, TransformationsWall } from "@/components/gallery";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
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
