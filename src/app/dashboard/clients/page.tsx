'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
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
import { addClient } from '@/hooks/clients';
import { useClients } from '@/hooks/useClients';
import { useState } from 'react';

export type ClientsProps = {
  id: number;
  name: string;
};

const ClientsPage = () => {
  const [clientName, setClientName] = useState<string>('');
  const { loading, clients, addNewClient } = useClients();

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
          <Input
            value={clientName}
            placeholder='Client name'
            onChange={(e) => setClientName(e.target.value)}
          />
          <DialogFooter>
            <div className='flex justify-end w-full'>
              <DialogPrimitive.Close>
                <Button
                  onClick={() => {
                    addNewClient({ name: clientName });
                  }}
                  type='submit'
                >
                  Save
                </Button>
              </DialogPrimitive.Close>
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
