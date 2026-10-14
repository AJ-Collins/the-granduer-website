import { base, type IconProps } from "./base";

export function IconLightning({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

