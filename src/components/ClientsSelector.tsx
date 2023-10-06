'use client';
import { useClients } from '@/hooks/useClients';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type ClientSelectorProps = {
  disabled?: boolean;
  value: string | undefined;
  handleChange: (value: string) => void;
};

const ClientSelector = ({
  disabled,
  value,
  handleChange,
}: ClientSelectorProps) => {
  const { clients } = useClients();

  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={handleChange}
    >
      <SelectTrigger className='md:w-[180px] h-10'>
        <SelectValue placeholder='Select a client' />
      </SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem value={client.id.toString()}>{client.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClientSelector;
