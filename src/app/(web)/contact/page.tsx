import { ConversionDoors, ProposalForm, ViewingForm } from "@/domains/web/enquiry";
import { Navbar } from "@/domains/web/home/Navbar";
import { SiteFooter } from "@/domains/web/home/SiteFooter";
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ConversionDoors />
        <ViewingForm />
        <ProposalForm />
      </main>
      <SiteFooter />
    </>
  );
}
