import { base, type IconProps } from "./base";

export function IconLock({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

