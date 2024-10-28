import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/DataTable';
import { getDataPoints, getDataSourceByName } from '@/lib/db';

export const Route = createFileRoute('/data/$name')({
  component: DataView,
});

function DataView() {
  const { name } = Route.useParams();
  
  const { data: dataSource } = useQuery({
    queryKey: ['dataSource', name],
    queryFn: () => getDataSourceByName(name),
  });

  const { data: dataPoints } = useQuery({
    queryKey: ['dataPoints', dataSource?.id],
    queryFn: () => (dataSource?.id ? getDataPoints(dataSource.id) : Promise.resolve([])),
    enabled: !!dataSource?.id,
  });

  if (!dataSource) {
    return <div>Data source not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{dataSource.name} Data</h1>
      <DataTable data={dataPoints || []} />
    </div>
  );
}