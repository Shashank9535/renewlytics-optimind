
import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Navigation />
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <div className={cn(
          "flex-1 p-6 animate-fade-in"
        )}>
          {children}
        </div>
      </main>
    </div>
  );
}
