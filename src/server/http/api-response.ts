export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: { page: number; pageSize: number; total: number; totalPages: number };
};

export type ApiFailure = {
  success: false;
  error: { code: string; message: string; retryAfterSeconds?: number; details?: unknown };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
