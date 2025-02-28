
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  Settings,
  Upload,
  Menu,
  X,
  Home,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
        isActive 
          ? "bg-renewal-500/10 text-renewal-700 dark:text-renewal-300" 
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/40"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 transition-colors",
        isActive 
          ? "text-renewal-600 dark:text-renewal-400" 
          : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
      )} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export function Navigation() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Overview', to: '/' },
    { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    { icon: Users, label: 'Segments', to: '/segments' },
    { icon: LineChart, label: 'Predictions', to: '/predictions' },
    { icon: Upload, label: 'Import Data', to: '/import' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <>
      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-40 transform transition-transform duration-300 md:hidden",
        mobileNavOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 pt-20 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8 px-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-renewal-600 to-renewal-400 flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <h1 className="text-xl font-bold">Renewlytics</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
            <div className="flex items-center gap-3 px-4 py-2">
              <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                <AvatarImage src="" />
                <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">JS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">John Smith</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">admin@company.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <aside className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-renewal-600 to-renewal-400 flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          <h1 className="text-xl font-bold animate-fade-in">Renewlytics</h1>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
              <AvatarImage src="" />
              <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">JS</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">John Smith</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">admin@company.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
