'use client';

import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { formatToPrice } from '@/lib/utils';
import { useState } from 'react';
import {
  Invoice,
  InvoiceItem,
  InvoiceStatus,
  useInvoices,
} from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';
import ClientSelector from './ClientsSelector';
import DialogInvoice from './DialogInvoice';
import InvoiceItemsTable from './InvoiceItemsTable';

const CreateEditInvoice = ({ invoice }: { invoice?: Invoice }) => {
  const [itemId, setItemId] = useState<number | null>(null);
  const [clientId, setClientId] = useState<string | undefined>(
    invoice?.clientId?.toString() || undefined
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(invoice?.dueDate || undefined)
  const [paid, setPaid] = useState<InvoiceStatus>(invoice?.paid || false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(
    invoice?.items || []
  );

  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState('0');

  const { saveInvoice } = useInvoices();

  const router = useRouter();

  const totalAmount =
    invoiceItems?.reduce((accumulator, item) => accumulator + item.amount, 0) ||
    0;

  const handleUpdateItem = () => {
    const item = {
      id: itemId,
      description,
      amount: Number(amount),
    };
    const updatedItems = invoiceItems?.map((it) =>
      it.id === itemId ? item : it
    );
    setInvoiceItems(updatedItems as InvoiceItem[]);
  };

  const handleAddItem = () => {
    const newArray = {
      id: invoiceItems?.length + 1 || 1,
      description: description,
      amount: Number(amount),
    };
    setInvoiceItems((invoices) => [...invoices, newArray]);
  };

  const isFilled = !!invoiceItems.length && clientId  && dueDate

  const handleSubmitItem = () => {
    if (itemId) {
      handleUpdateItem();
    } else {
      handleAddItem();
    }
    clearItem();
  };

  const handleSaveInvoice = async () => {
    if(!isFilled) return
    const newInvoice = {
      id: invoice?.id,
      clientId: Number(clientId),
      paid,
      dueDate: dueDate as Date,
      items: invoiceItems,
    };

    await saveInvoice(newInvoice);
    router.back();
  };

  const handleDeleteItem = (id: number) => {
    const updatedInvoiceItems = invoiceItems.filter((inv) => inv.id !== id);
    setInvoiceItems(updatedInvoiceItems);
  };

  const clearItem = () => {
    setAmount('');
    setDescription('');
    setItemId(null);
  };

  const handleEditItem = (id: number) => {
    setItemId(id);
    const item = invoiceItems.find((it) => it.id === id);
    setDescription(item!.description);
    setAmount(item!.amount.toString());
  };
  
  return (
    <>
      <h1 className='text-4xl font-semibold'>
        {invoice ? 'Edit' : 'Create'} Invoice
      </h1>

      <div className='flex flex-col md:flex-row gap-4 mt-4'>
        <ClientSelector
          disabled={!!invoice}
          value={clientId}
          handleChange={(e) => setClientId(e)}
        />
        <DialogInvoice
          onSubmit={handleSubmitItem}
          amount={amount}
          description={description}
          handleAmount={(e) => setAmount(e)}
          handleDescription={(e) => setDescription(e)}
          open={itemId ? true : undefined}
          onOpenChange={() => {
            clearItem();
          }}
        />
        <div className='w-full md:w-auto md:ml-auto'>
          <DatePicker onChange={e => setDueDate(e)} defaultValue={dueDate}/>
        </div>
      </div>

      <InvoiceItemsTable
        data={invoiceItems}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />

      <div className='flex justify-end mt-6'>
        <p className='text-xl font-bold'>Total: {formatToPrice(totalAmount)}</p>
      </div>
      <div className='flex justify-end mt-10 gap-2'>
        <Button className='mr-auto' variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        {!paid ? (
          <Button variant='sucess' onClick={() => setPaid(true)}>
            Mark as paid
          </Button>
        ) : (
          <Button variant='destructive' onClick={() => setPaid(false)}>
            Mark as unpaid
          </Button>
        )}
        <Button
          onClick={handleSaveInvoice}
          className={!isFilled ? " cursor-not-allowed" : ""}
          variant={!isFilled ? "secondary" : 'default'}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default CreateEditInvoice;
