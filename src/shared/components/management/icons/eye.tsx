import { base, type IconProps } from "./base";

export function IconEye({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

