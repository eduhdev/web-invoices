import { formatToPrice } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { InvoiceItem } from '@/hooks/useInvoices';
import { InvoiceTableItemAction } from './InvoiceTableItemAction';

const InvoiceItemsTable = ({
  data,
  onDeleteItem,
  onEditItem,
}: {
  data: InvoiceItem[];
  onDeleteItem: (id: number) => void;
  onEditItem: (id: number) => void;
}) => (
  <Table className='mt-6'>
    <TableHeader>
      <TableRow>
        <TableHead>Description</TableHead>
        <TableHead className='md:w-[100px]'>Amount</TableHead>
        <TableHead className='md:w-[100px] text-right'>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data?.map((item) => (
        <TableRow key={item.id} className='max-sm:text-xs'>
          <TableCell>{item.description}</TableCell>
          <TableCell>{formatToPrice(item.amount)}</TableCell>
          <TableCell className='flex justify-end pr-4'>
            <InvoiceTableItemAction
              onDelete={() => onDeleteItem(item.id)}
              onEdit={() => onEditItem(item.id)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default InvoiceItemsTable;
