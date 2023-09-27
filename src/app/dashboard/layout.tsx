import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <div className='w-full max-w-[15rem] bg-primary min-h-screen py-8 px-4 flex flex-col items-center'>
        <Avatar className='h-20 w-20 mb-8'>
          <AvatarImage src='https://github.com/eduhdev.png' />
          <AvatarFallback>Edu</AvatarFallback>
        </Avatar>
        <Separator className='opacity-50' />
        <div className='text-white text-lg space-y-2 mt-8'>
          <Link href='/dashboard'>Home</Link>
        </div>
      </div>
      <div className='flex flex-1'>{children}</div>
    </div>
  );
}
