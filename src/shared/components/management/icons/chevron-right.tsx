import { base, type IconProps } from "./base";

export function IconChevronRight({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

