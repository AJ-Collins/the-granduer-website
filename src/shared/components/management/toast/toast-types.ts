export type ToastType = "success" | "error" | "info" | "warning";

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
};

export type ToastOptions = {
  description?: string;
  duration?: number;
};
