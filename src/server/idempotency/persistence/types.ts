export type ReserveResult =
  | { kind: "reserved"; recordId: string }
  | { kind: "replayed"; status: number; body: unknown };

export type ReserveInput = {
  scope: string;
  actor: string;
  key: string;
  fingerprint: string;
};
