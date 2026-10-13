import { Suspense } from "react";
import { LoginForm } from "@/domains/auth/login-form";

export default function CmsLoginPage() {
  return (
    <Suspense>
      <LoginForm
        title="CMS Login"
        allowedRoles={["admin", "superadmin", "editor", "viewer"]}
      />
    </Suspense>
  );
}
