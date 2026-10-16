import { Navbar } from "@/domains/web/shell/Navbar";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";
import { PackageCompare, PackageTiers, PackagesCTA, PackagesHero, PackageViewBeacon } from "@/domains/web/packages";
export default function PackagesPage() {
  return (
    <>
      <PackageViewBeacon />
      <Navbar />
      <main>
        <PackagesHero />
        <PackageTiers />
        <PackageCompare />
        <PackagesCTA />
      </main>
      <SiteFooter />
    </>
  );
}
