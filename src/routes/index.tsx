import { createFileRoute } from '@tanstack/react-router';
import { DataSourceList } from '@/components/DataSourceList';
import { AddDataSourceDialog } from '@/components/AddDataSourceDialog';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Data Sources</h1>
        <AddDataSourceDialog />
      </div>
      <DataSourceList />
    </div>
  );
}