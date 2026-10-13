export function isLocalMockMode(): boolean {
  return process.env.MOCK_AUTH === "1";
}
