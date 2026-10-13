import { ConversionDoors, ProposalForm, ViewingForm } from "@/domains/enquiry";
import { Navbar } from "@/domains/home/Navbar";
import { SiteFooter } from "@/domains/home/SiteFooter";
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
