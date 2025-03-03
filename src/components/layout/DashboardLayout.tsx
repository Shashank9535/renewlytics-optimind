
import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';
import { ThemeSettingsButton } from '../dashboard/ThemeSettingsButton';
import { ThemeSettings } from '../dashboard/ThemeSettings';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { layoutDensity } = useTheme();
  
  // Set padding based on layout density
  const contentPadding = {
    compact: 'p-4',
    comfortable: 'p-6',
    spacious: 'p-8'
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Navigation />
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <div className="flex justify-end p-4 border-b border-slate-100 dark:border-slate-800">
          <ThemeSettingsButton />
        </div>
        <div className={cn(
          "flex-1 animate-fade-in",
          contentPadding[layoutDensity]
        )}>
          {children}
        </div>
      </main>
      <ThemeSettings />
    </div>
  );
}
