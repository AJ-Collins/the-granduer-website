export function published<T extends { status: string }>(row: T) {
  return { ...row, status: row.status.toLowerCase() };
}
