import { Suspense } from "react";
import { LoginForm } from "@/domains/auth/login-form";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm title="Admin Login" allowedRoles={["admin", "superadmin"]} />
    </Suspense>
  );
}
