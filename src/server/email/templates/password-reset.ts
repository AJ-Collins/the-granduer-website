import { wrapMail, type BuiltMail } from "./mail-layout";

export function resetPasswordMail(token: string): BuiltMail {
  const subject = "Reset your D'Grandeur password";
  const text = `Use this token within 60 minutes to reset your password: ${token}`;
  return {
    subject,
    text,
    html: wrapMail({
      heading: "Reset your password",
      intro: "Use the token below within 60 minutes to reset your password.",
      lines: [token],
      note: "If you did not request this, you can safely ignore this email.",
    }),
  };
}
