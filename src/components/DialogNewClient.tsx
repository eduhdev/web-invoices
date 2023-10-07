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
        <Button className='mt-4 max-sm:w-full'>Create New</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-w-[90vw] '>
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
            {clientName ? (
              <DialogPrimitive.Close>
                <Button
                  onClick={() => {
                    addNewClient({ name: clientName });
                    setClientName('');
                  }}
                >
                  Save
                </Button>
              </DialogPrimitive.Close>
            ) : (
              <Button variant='disabled'>Save</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewClient;
