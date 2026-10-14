import { Suspense } from "react";
import { CmsLoginForm } from "@/domains/cms/auth/cms-login-form";

export default function CmsLoginPage() {
  return (
    <Suspense>
      <CmsLoginForm />
    </Suspense>
  );
}
