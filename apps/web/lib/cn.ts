type ClassValue =
  | string
  | number
  | bigint
  | false
  | null
  | undefined
  | 0
  | ClassValue[];

/** Join class names, ignoring falsy values. Minimal `clsx`-style helper. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const push = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      for (const v of value) push(v);
      return;
    }
    if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
      const s = String(value).trim();
      if (s) out.push(s);
    }
  };

  for (const input of inputs) push(input);
  return out.join(" ");
}
