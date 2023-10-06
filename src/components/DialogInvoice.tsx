import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useRef } from 'react';
import { Label } from './ui/label';

type DialogInvoiceProps = {
  onSubmit: () => void;
  description: string;
  handleDescription: (value: string) => void;
  amount: string;
  handleAmount: (value: string) => void;
  open: true | undefined;
  onOpenChange: () => void;
};

const DialogInvoice = ({
  onSubmit,
  description,
  handleDescription,
  amount,
  handleAmount,
  open,
  onOpenChange,
}: DialogInvoiceProps) => {
  const dialogRef = useRef();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger ref={dialogRef.current} asChild>
        <Button className='h-10 order-2 md:order-none'>Add a new entry</Button>
      </DialogTrigger>

      <DialogContent className='md:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>What did you achieve during that time?</DialogTitle>
          <DialogDescription>
            Especify the tasks you worked and the charged amount.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
          <Textarea
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
            className='w-full'
            rows={6}
            placeholder='Fix CSS issues'
          />
          <div className='flex items-center justify-end gap-8'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              value={amount}
              onChange={(e) => handleAmount(e.target.value)}
              placeholder='Amount'
              className='w-36'
              type='number'
            />
          </div>
        </div>
        <DialogFooter className='flex justify-end'>
          {description && amount ? (
            <DialogPrimitive.Close>
              <Button onClick={onSubmit}>Save</Button>
            </DialogPrimitive.Close>
          ) : (
            <Button variant='disabled'>Save</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInvoice;
