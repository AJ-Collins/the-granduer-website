import { Suspense } from "react";
import { AdminLoginForm } from "@/domains/admin/auth";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
