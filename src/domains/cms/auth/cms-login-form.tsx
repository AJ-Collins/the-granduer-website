import { MgmtLoginForm } from "@/shared/components/management/mgmt-login-form";

export function CmsLoginForm() {
  return (
    <MgmtLoginForm
      allowedRoles={["admin", "superadmin", "editor", "viewer"]}
      deniedMessage="This account cannot access the CMS studio"
      brandLabel="D'Grandeur CMS"
      heading="CMS Login"
      subheading="Sign in to manage content and catalogue."
      heroImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80"
      heroQuote="Where luxury, style and elegance come together."
      heroCaption="D'Grandeur Event Centre"
    />
  );
}
