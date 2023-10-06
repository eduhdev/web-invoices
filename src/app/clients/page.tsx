import DialogNewClient from '@/components/DialogNewClient';
import ClientsTable from '@/components/ClientsTable';

export type ClientsProps = {
  id: number;
  name: string;
};

export default function ClientsPage() {
  return (
    <>
      <h1 className='text-4xl font-semibold'>Clients List</h1>
      <DialogNewClient />
      <ClientsTable />
    </>
  );
}
