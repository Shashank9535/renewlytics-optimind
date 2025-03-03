
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
        <header className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            {/* This is where we could add page heading or breadcrumbs */}
          </div>
          <div className="flex items-center gap-2">
            <ThemeSettingsButton />
          </div>
        </header>
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
