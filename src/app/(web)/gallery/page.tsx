import { AssetGroups, GalleryCTA, GalleryHero, TransformationsWall } from "@/domains/web/gallery";
import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
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
