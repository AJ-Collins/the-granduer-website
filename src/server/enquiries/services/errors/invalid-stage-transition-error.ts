export class InvalidStageTransitionError extends Error {
  readonly status = 400;
  constructor(from: string, to: string) {
    super(`Cannot move opportunity from ${from} to ${to}`);
    this.name = "InvalidStageTransitionError";
  }
}
