import { Navbar } from "@/domains/web/shell/Navbar";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";
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
