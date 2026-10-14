import { AssetGroups, GalleryCTA, GalleryHero, TransformationsWall } from "@/domains/web/gallery";
import { Navbar } from "@/domains/web/shell/Navbar";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";
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
