import { ConversionDoors, ProposalForm, ViewingForm } from "@/components/enquiry";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";
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
