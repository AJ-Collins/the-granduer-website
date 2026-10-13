import { ensureSeedFaq } from "../../src/server/cms/persistence/queries/ensure-seed-faq";

export async function seedContent() {
  const faqs = [
    { question: "Where is D'Grandeur located?", answer: "Details of our venue and how to find us are on the venue page.", category: "Venue", sortOrder: 1 },
    { question: "How do I book a viewing?", answer: "Send a viewing enquiry and our team will arrange a time.", category: "Booking", sortOrder: 2 },
  ];
  for (const f of faqs) await ensureSeedFaq({ ...f, status: "published" });
  console.log("content seeded");
}
