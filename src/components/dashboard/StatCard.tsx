
import { ReactNode } from 'react';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
  valueClassName?: string;
  children?: ReactNode;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className,
  valueClassName,
  children,
}: StatCardProps) {
  const isTrendPositive = trend !== undefined && trend > 0;
  const isTrendNegative = trend !== undefined && trend < 0;
  const trendAbs = trend ? Math.abs(trend) : 0;

  return (
    <div className={cn("rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 soft-shadow", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />}
      </div>
      
      <div className="mt-2 flex flex-col">
        <div className={cn("text-2xl font-bold", valueClassName)}>
          {value}
        </div>
        
        {(trend !== undefined || description) && (
          <div className="mt-1 flex items-center gap-1.5">
            {trend !== undefined && (
              <span 
                className={cn(
                  "text-xs font-medium flex items-center",
                  isTrendPositive ? "text-emerald-600 dark:text-emerald-500" : "",
                  isTrendNegative ? "text-rose-600 dark:text-rose-500" : "",
                  !isTrendPositive && !isTrendNegative ? "text-slate-500 dark:text-slate-400" : ""
                )}
              >
                {isTrendPositive && <ArrowUp className="w-3 h-3 mr-0.5" />}
                {isTrendNegative && <ArrowDown className="w-3 h-3 mr-0.5" />}
                {trendAbs}%
              </span>
            )}
            
            {trendLabel && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {trendLabel}
              </span>
            )}
            
            {description && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
