export function pageMeta(page: number, pageSize: number, total: number) {
  return { page, pageSize, total, totalPages: Math.ceil(total / pageSize) };
}
