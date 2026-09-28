export type LoginInput = {
  email: string;
  password: string;
};

export async function login(_input: LoginInput): Promise<void> {
  throw new Error("Not implemented");
}
