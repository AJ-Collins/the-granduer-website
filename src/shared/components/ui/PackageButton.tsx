import type { ButtonHTMLAttributes } from "react";

export function PackageButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}
