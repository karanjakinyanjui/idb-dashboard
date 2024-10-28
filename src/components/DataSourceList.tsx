import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getDataSources } from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export function DataSourceList() {
  const { data: dataSources } = useQuery({
    queryKey: ['dataSources'],
    queryFn: getDataSources,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataSources?.map((source) => (
          <TableRow key={source.id}>
            <TableCell>
              <Link
                to="/data/$name"
                params={{ name: source.name }}
                className="text-blue-600 hover:underline"
              >
                {source.name}
              </Link>
            </TableCell>
            <TableCell>{source.url}</TableCell>
            <TableCell>
              {format(new Date(source.createdAt), 'PPP')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}