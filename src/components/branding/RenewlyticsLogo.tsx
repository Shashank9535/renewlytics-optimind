
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface RenewlyticsLogoProps {
  variant?: 'default' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RenewlyticsLogo: React.FC<RenewlyticsLogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  // Icon-only variant
  if (variant === 'icon-only') {
    return (
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-600 to-renewal-400",
          sizeClasses[size],
          "aspect-square",
          className
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
        <span className="relative text-white font-bold">
          <TrendingUp 
            className={cn(
              "text-white",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
            )} 
          />
        </span>
      </div>
    );
  }

  // Default variant with text and icon
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-600 to-renewal-400",
          sizeClasses[size],
          "aspect-square"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
        <span className="relative text-white font-bold">
          <TrendingUp 
            className={cn(
              "text-white",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
            )} 
          />
        </span>
      </div>
      <span 
        className={cn(
          "font-bold text-slate-900 dark:text-white",
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl'
        )}
      >
        Renewlytics
      </span>
    </div>
  );
};
