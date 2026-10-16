import { TableSkeleton } from "@/shared/components/management";

export default function OpportunitiesLoading() {
  return <TableSkeleton rows={6} cols={5} />;
}
