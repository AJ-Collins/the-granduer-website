import { Badge } from "@/shared/components/ui/Badge";
import { Table } from "@/shared/components/ui/Table";

export type CmsEnquiryRow = {
  id: string;
  kind: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

export function EnquiriesTable({ enquiries }: { enquiries: CmsEnquiryRow[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Kind</th>
          <th>Status</th>
          <th>Received</th>
        </tr>
      </thead>
      <tbody>
        {enquiries.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.kind}</td>
            <td>
              <Badge>{e.status}</Badge>
            </td>
            <td>{e.createdAt.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
