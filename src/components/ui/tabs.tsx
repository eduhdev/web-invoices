'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const TabsList = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div
    className={cn(
      'flex gap-1 h-9 items-center justify-center rounded-lg bg-primary p-1 text-muted-foreground'
    )}
  >
    {children}
  </div>
);

const TabItem = ({
  title,
  active,
  handleChange,
}: {
  title: string;
  active: boolean;
  handleChange: () => void;
}) => (
  <div
    className={cn(
      'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
      active ? 'bg-white' : 'text-white'
    )}
    onClick={handleChange}
  >
    {title}
  </div>
);

export { TabsList, TabItem };
