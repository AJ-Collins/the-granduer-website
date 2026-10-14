import { TableSkeleton } from "@/shared/components/management";

export default function UsersLoading() {
  return <TableSkeleton rows={6} cols={5} />;
}
