import { Navbar } from "@/domains/web/shell/Navbar";
import { Hero } from "@/domains/web/home/Hero";
import { Welcome } from "@/domains/web/home/Welcome";
import { AtAGlance } from "@/domains/web/home/AtAGlance";
import { CelebrateYourWay } from "@/domains/web/home/CelebrateYourWay";
import { FinalCTA } from "@/domains/web/home/FinalCTA";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1c2c3c] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Welcome />
        <AtAGlance />
        <CelebrateYourWay />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
