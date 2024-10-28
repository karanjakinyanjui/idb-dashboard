import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface DataTableProps {
  data: Array<{
    id?: number;
    sourceId: number;
    data: unknown;
    cachedAt: Date;
  }>;
}

export function DataTable({ data }: DataTableProps) {
  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const sampleData = data[0].data as Record<string, unknown>;
    const dataColumns: ColumnDef<typeof data[0]>[] = Object.keys(sampleData).map(
      (key) => ({
        accessorFn: (row) => (row.data as Record<string, unknown>)[key],
        header: key,
        id: key,
      })
    );

    return [
      {
        accessorFn: (row) => format(new Date(row.cachedAt), 'PPP pp'),
        header: 'Cached At',
        id: 'cachedAt',
      },
      ...dataColumns,
    ];
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}