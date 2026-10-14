import { TableSkeleton } from "@/shared/components/management";

export default function SubmissionsLoading() {
  return <TableSkeleton rows={6} cols={5} />;
}
