import { base, type IconProps } from "./base";

export function IconChevronDown({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

