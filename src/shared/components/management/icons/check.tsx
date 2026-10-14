import { base, type IconProps } from "./base";

export function IconCheck({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

