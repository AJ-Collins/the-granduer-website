export function enquiryAckMail(name: string, kind: string): { subject: string; text: string } {
  return {
    subject: "We received your D'Grandeur enquiry",
    text: `Hi ${name}, thanks for your ${kind} request. Our team will respond shortly.`,
  };
}
