import { Suspense } from "react";
import { CmsLoginForm } from "@/domains/cms/auth";

export default function CmsLoginPage() {
  return (
    <Suspense>
      <CmsLoginForm />
    </Suspense>
  );
}
