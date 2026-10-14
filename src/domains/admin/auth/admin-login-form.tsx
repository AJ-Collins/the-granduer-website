import { MgmtLoginForm } from "@/shared/components/management/mgmt-login-form";

export function AdminLoginForm() {
  return (
    <MgmtLoginForm
      allowedRoles={["admin", "superadmin"]}
      deniedMessage="This account cannot access the admin console"
      brandLabel="D'Grandeur Admin"
      heading="Admin Login"
      subheading="Sign in with your administrator account."
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80"
      heroQuote="Where luxury, style and elegance come together."
      heroCaption="D'Grandeur Event Centre"
    />
  );
}
