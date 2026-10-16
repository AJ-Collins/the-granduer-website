import { selectEnquiries, type EnquiryFilters } from "../../persistence/queries/select-enquiries";

export async function listEnquiries(
  page: number,
  pageSize: number,
  status?: string,
  filters: Omit<EnquiryFilters, "status"> = {},
) {
  return selectEnquiries(page, pageSize, { ...filters, ...(status !== undefined && { status }) });
}
