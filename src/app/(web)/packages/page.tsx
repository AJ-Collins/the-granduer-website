import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
import { PackageCompare, PackageTiers, PackagesCTA, PackagesHero } from "@/domains/web/packages";
export default function PackagesPage() {
  return (
    <>
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
