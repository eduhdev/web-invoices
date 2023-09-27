import { Loader2 } from 'lucide-react';

export const Spinner = () => (
  <div className='text-primary flex items-center justify-center my-10 w-full'>
    <Loader2 size={40} className='animate-spin' />
  </div>
);
