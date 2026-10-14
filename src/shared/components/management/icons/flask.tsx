import { base, type IconProps } from "./base";

export function IconFlask({ size, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} aria-hidden="true">
      <path d="M10 2v7.31L4.14 19.33A2 2 0 0 0 5.86 22h12.28a2 2 0 0 0 1.72-2.67L14 9.31V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </svg>
  );
}

