import { wrapMail, type BuiltMail } from "./mail-layout";

export function enquiryAckMail(name: string, kind: string): BuiltMail {
  const subject = "We received your D'Grandeur enquiry";
  const text = `Hi ${name}, thanks for your ${kind} request. Our team will respond shortly.`;
  return {
    subject,
    text,
    html: wrapMail({
      heading: `Thank you, ${name}`,
      intro: `Thanks for your ${kind} request. Our team will respond shortly.`,
      note: "You received this because you sent an enquiry on the D'Grandeur website.",
    }),
  };
}
