import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { invoicesMock } from '@/lib/mocks';
import { formatToPrice } from '@/lib/utils';

const CreateInvoicePage = () => {
  const totalAmount = invoicesMock[0].items?.reduce((accumulator, item) => accumulator + item.amount, 0) || 0;
  return (
    <>
      <h1 className='text-4xl font-semibold'>Create Invoice</h1>

      <div className='flex gap-4 mt-4'>
        <Select>
          <SelectTrigger className='w-[180px] h-10'>
            <SelectValue placeholder='Select a client' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='client1'>Client 1</SelectItem>
            <SelectItem value='client2'>Client 2</SelectItem>
            <SelectItem value='client3'>Client 3</SelectItem>
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
                Especify the tasks you worked and the due date.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <Textarea rows={6} placeholder='Fix CSS issues' />
              <DatePicker />
            </div>
            <DialogFooter>
              <Button type='submit'>Finish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table className='border mt-6'>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className='w-[100px]'>Amount</TableHead>
            <TableHead className='text-right'>Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoicesMock[0].items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{formatToPrice(item.amount)}</TableCell>
              <TableCell className='text-right'>{item.due_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end mt-6'>
        <p className='text-xl font-bold'>Total: {formatToPrice(totalAmount)}</p>
      </div>
    </>
  );
};

export default CreateInvoicePage;
