import { InvoicesProvider } from '@/hooks/useInvoices';
import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { ClientsProvider } from '@/hooks/useClients';
import SessionProvider from '@/components/SessionProvider';
import SidebarNav from '@/components/SidebarNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Invoice',
  description: 'An invoice application developed by Eduhdev',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  return (
    <html lang='en'>
      <body className={inter.className}>
        <InvoicesProvider>
          <ClientsProvider>
            <div className='flex'>
              <SessionProvider session={session}>
                <SidebarNav />
              </SessionProvider>

              <div className='flex flex-1'>
                <div className='flex-1 pt-8 px-4'>{children}</div>
              </div>
            </div>
          </ClientsProvider>
        </InvoicesProvider>
      </body>
    </html>
  );
}
