export function resetPasswordMail(token: string): { subject: string; text: string } {
  return {
    subject: "Reset your D'Grandeur password",
    text: `Use this token within 60 minutes to reset your password: ${token}`,
  };
}
