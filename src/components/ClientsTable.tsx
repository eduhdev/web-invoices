"use client"
import { useClients } from '@/hooks/useClients';
import { Spinner } from './Spinner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const ClientsTable = () => {
  const { loading, clients } = useClients();

  return (
    <Table className=' mt-6'>
      <TableCaption className='mt-8 pt-4 border-t-2'>
        A list of your clients.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <Spinner />
        ) : (
          clients.map((client) => (
            <TableRow key={client.id} className='h-12'>
              <TableCell>{client.name}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable