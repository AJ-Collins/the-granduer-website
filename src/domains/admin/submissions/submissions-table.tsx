import { Badge } from "@/shared/components/ui/Badge";
import { Table } from "@/shared/components/ui/Table";

export type SubmissionRow = {
  id: string;
  kind: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

export function SubmissionsTable({ submissions }: { submissions: SubmissionRow[] }) {
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
        {submissions.map((s) => (
          <tr key={s.id}>
            <td>
              <a href={`/submissions/${s.id}`}>{s.name}</a>
            </td>
            <td>{s.email}</td>
            <td>{s.kind}</td>
            <td>
              <Badge>{s.status}</Badge>
            </td>
            <td>{s.createdAt.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
