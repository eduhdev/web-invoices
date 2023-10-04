'use client';

import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getClients } from '@/hooks/clients';
import { useEffect, useState } from 'react';
const ClientsPage = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientsProps[]>([]);

  type ClientsProps = {
    id: number,
    name: string,
  }

  const fetchClients = async () => {
    setLoading(true);
    const allClients = await getClients();
    setClients(allClients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <h1 className='text-4xl font-semibold'>Clients List</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className='mt-4'>Create New</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add a new Client</DialogTitle>
          </DialogHeader>
          <Input placeholder='Client name' />
          <DialogFooter>
            <div className='flex justify-end w-full'>
              <Button type='submit'>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default ClientsPage;
