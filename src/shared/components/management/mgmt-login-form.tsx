"use client";

import { ThemeProvider } from "./theme-provider";
import { MgmtLoginFormContent, type MgmtLoginFormContentProps } from "./mgmt-login-form-content";

export function MgmtLoginForm(props: MgmtLoginFormContentProps) {
  return (
    <ThemeProvider>
      <MgmtLoginFormContent {...props} />
    </ThemeProvider>
  );
}
