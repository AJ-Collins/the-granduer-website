import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
import { PackageCompare, PackageTiers, PackagesCTA, PackagesHero } from "@/domains/packages";
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
