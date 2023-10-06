"use client"
import { useClients } from '@/hooks/useClients';
import { Spinner } from './Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const ClientsTable = () => {
  const { loading, clients } = useClients();

  return (
    <Table className='border mt-6'>
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
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable