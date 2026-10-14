import type { SVGAttributes, ReactNode } from "react";

export type IconProps = SVGAttributes<SVGSVGElement> & { size?: number };

export function base(size: number | undefined, props: SVGAttributes<SVGSVGElement>) {
  const s = size ?? 20;
  return {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function createIcon(name: string, content: ReactNode) {
  const Component = ({ size, ...props }: IconProps) => (
    <svg {...base(size, props)} aria-hidden="true">
      {content}
    </svg>
  );
  Component.displayName = `Icon${name}`;
  return Component;
}
