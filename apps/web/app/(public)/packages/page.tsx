import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
import { PackageCompare, PackageTiers, PackagesCTA, PackagesHero } from "@/components/packages";
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
