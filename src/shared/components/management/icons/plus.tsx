import { base, type IconProps } from "./base";

export function IconPlus({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

