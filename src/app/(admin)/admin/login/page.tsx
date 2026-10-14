import { Suspense } from "react";
import { AdminLoginForm } from "@/domains/admin/auth/admin-login-form";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
