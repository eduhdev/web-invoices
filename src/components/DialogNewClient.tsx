'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { useClients } from '@/hooks/useClients';

const DialogNewClient = () => {
  const { addNewClient } = useClients();
  const [clientName, setClientName] = useState<string>('');

  return (
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
  );
};

export default DialogNewClient;
