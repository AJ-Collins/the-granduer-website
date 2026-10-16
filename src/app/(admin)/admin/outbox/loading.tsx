import { TableSkeleton } from "@/shared/components/management";

export default function OutboxLoading() {
  return <TableSkeleton rows={6} cols={5} />;
}
