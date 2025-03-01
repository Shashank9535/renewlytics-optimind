import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import {
  LayoutDashboard,
  BarChart2,
  Pipette,
  Users,
  FileText,
  Menu,
  X,
  ArrowUpRight,
  Upload,
  GitMerge,
  Zap,
  Brain
} from 'lucide-react';

type Link = {
  name: string;
  href: string;
  icon: JSX.Element;
  badge?: 'new' | 'beta' | 'ai';
};

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const links: Link[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: 'Predictions',
      href: '/predictions',
      icon: <Brain className="h-5 w-5" />,
      badge: 'ai',
    },
    {
      name: 'Segments',
      href: '/segments',
      icon: <Pipette className="h-5 w-5" />,
    },
    {
      name: 'Automations',
      href: '/automations',
      icon: <Zap className="h-5 w-5" />,
      badge: 'new',
    },
    {
      name: 'Integrations',
      href: '/integrations',
      icon: <GitMerge className="h-5 w-5" />,
      badge: 'new',
    },
    {
      name: 'Import',
      href: '/import',
      icon: <Upload className="h-5 w-5" />,
    },
  ];

  const getLinkClassName = (href: string) => {
    const isActive = location.pathname === href;
    return cn(
      'group flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm font-medium',
      isActive
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
    );
  };

  const navLinks = links.map((link) => (
    <Link
      key={link.name}
      to={link.href}
      className={getLinkClassName(link.href)}
      onClick={() => setIsOpen(false)}
    >
      {link.icon}
      <span>{link.name}</span>
      {link.badge && (
        <span 
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 text-xs font-medium leading-none",
            link.badge === 'new' 
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
              : link.badge === 'ai'
                ? "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
          )}
        >
          {link.badge === 'ai' ? 'AI' : link.badge.toUpperCase()}
        </span>
      )}
    </Link>
  ));

  return (
    <>
      {isMobile && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <Link to="/" className="flex items-center gap-2">
            <RenewlyticsLogo className="h-8 w-8" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Renewlytics
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 transition-transform lg:static lg:z-auto lg:translate-x-0 lg:border-r lg:border-slate-200 dark:lg:border-slate-800 lg:w-64',
          isMobile && !isOpen && '-translate-x-full',
          isMobile && 'pt-0',
          !isMobile && 'pt-6'
        )}
      >
        {!isMobile && (
          <div className="flex items-center gap-2 px-4 py-2 mb-4">
            <Link to="/" className="flex items-center gap-2">
              <RenewlyticsLogo className="h-8 w-8" />
              <span className="font-semibold text-slate-900 dark:text-white">
                Renewlytics
              </span>
            </Link>
          </div>
        )}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-1">{navLinks}</div>
          <div className="mt-8">
            <h4 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Resources
            </h4>
            <div className="mt-2 space-y-1">
              <button className="w-full group flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50">
                <FileText className="h-5 w-5" />
                <span>Documentation</span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full group flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50">
                <Users className="h-5 w-5" />
                <span>Community</span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
