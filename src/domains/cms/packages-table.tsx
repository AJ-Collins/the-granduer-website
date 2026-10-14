import { Badge } from "@/shared/components/ui/Badge";
import { Table } from "@/shared/components/ui/Table";

export type CmsPackageRow = {
  id: string;
  slug: string;
  name: string;
  tier: string;
  status: string;
  priceCents: number | null;
  currency: string;
};

export function PackagesTable({ packages }: { packages: CmsPackageRow[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tier</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.tier}</td>
            <td>{p.priceCents == null ? "—" : `${p.currency} ${(p.priceCents / 100).toLocaleString()}`}</td>
            <td>
              <Badge>{p.status}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
