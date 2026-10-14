import { ConversionDoors, ProposalForm, ViewingForm } from "@/domains/web/enquiry";
import { Navbar } from "@/domains/web/shell/Navbar";
import { SiteFooter } from "@/domains/web/shell/SiteFooter";
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
