import { base, type IconProps } from "./base";

export function IconMenu({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

