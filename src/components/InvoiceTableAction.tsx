import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvoiceStatus } from '@/hooks/useInvoices';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

type TableAction = {
  id: number;
  status: InvoiceStatus;
};

export function InvoiceTableAction({ id, status }: TableAction) {
  return (
    <div className=' cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <Link href={`/dashboard/invoices/${id}`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Mark as {status === 'paid' ? 'Unpaid' : 'Paid'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
