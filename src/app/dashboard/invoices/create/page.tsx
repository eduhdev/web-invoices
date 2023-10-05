'use client';

import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { formatToPrice } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import { InvoiceItem, InvoiceStatus, useInvoices } from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';

const CreateInvoicePage = () => {
  const [status, setStatus] = useState<InvoiceStatus>('unpaid');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState('0');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [clientId, setClientId] = useState<string | undefined>()

  const { clients } = useClients();
  const { addNewInvoice } = useInvoices();

  const router = useRouter();

  const totalAmount =
    invoiceItems?.reduce((accumulator, item) => accumulator + item.amount, 0) ||
    0;

  const handleAddItem = () => {
    const newArray = {
      id: invoiceItems?.length + 1 || 1,
      description: description,
      amount: Number(amount),
    };

    setInvoiceItems((invoices) => [...invoices, newArray]);
  };

  const handleSaveInvoice = async () => {
    const invoice = {
      clientId: Number(clientId),
      status,
      dueDate: 800,
      items: invoiceItems,
    };

    await addNewInvoice(invoice);
    router.back();
  };

  return (
    <>
      <h1 className='text-4xl font-semibold'>Create Invoice</h1>

      <div className='flex gap-4 mt-4'>
        <Select value={clientId} onValueChange={e => setClientId(e)}>
          <SelectTrigger className='w-[180px] h-10'>
            <SelectValue placeholder='Select a client' />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem value={client.id.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='h-10'>Add a new entry</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>What did you achieve during that time?</DialogTitle>
              <DialogDescription>
                Especify the tasks you worked and the amount charged.
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-4 py-4'>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full'
                rows={6}
                placeholder='Fix CSS issues'
              />
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                className='w-36'
                type='number'
              />
            </div>
            <DialogFooter className='flex justify-end'>
              <DialogPrimitive.Close>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogPrimitive.Close>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className='ml-auto'>
          <DatePicker />
        </div>
      </div>

      <Table className='border mt-6'>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className='w-[100px]'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceItems?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{formatToPrice(item.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end mt-6'>
        <p className='text-xl font-bold'>Total: {formatToPrice(totalAmount)}</p>
      </div>
      <div className='flex justify-end mt-10 gap-2'>
        <Button onClick={handleSaveInvoice}>Save</Button>
        {status === 'unpaid' ? (
          <Button
            className='bg-green-500 hover:bg-green-400'
            onClick={() => setStatus('paid')}
          >
            Mark as paid
          </Button>
        ) : (
          <Button
            className=' bg-red-500 hover:bg-red-400'
            onClick={() => setStatus('unpaid')}
          >
            Mark as unpaid
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateInvoicePage;
