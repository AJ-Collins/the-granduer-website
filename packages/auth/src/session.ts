export type Session = {
  userId: string;
} | null;

export async function getSession(): Promise<Session> {
  throw new Error("Not implemented");
}
