import { AppError } from "../../../../../core/errors/app-error.js";

export const enquiryNotFound = (id: string) =>
  new AppError(404, "ENQUIRY_NOT_FOUND", `Enquiry ${id} not found`);
