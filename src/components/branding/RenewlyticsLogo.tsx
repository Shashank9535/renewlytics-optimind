
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface RenewlyticsLogoProps {
  variant?: 'default' | 'icon-only' | 'with-tagline';
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
          "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-700 to-renewal-500",
          sizeClasses[size],
          "aspect-square",
          className
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Neural network inspired lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full"></div>
            <div className="absolute w-[40%] h-[40%] border-2 border-white/30 rounded-full"></div>
            <div className="absolute w-[20%] h-[20%] bg-white/40 rounded-full"></div>
          </div>
          
          {/* Trend icon in the foreground */}
          <TrendingUp 
            className={cn(
              "text-white relative z-10",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
            )} 
          />
        </div>
      </div>
    );
  }

  // With tagline variant
  if (variant === 'with-tagline') {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="flex items-center gap-2 mb-1">
          <div 
            className={cn(
              "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-700 to-renewal-500",
              sizeClasses[size],
              "aspect-square"
            )}
          >
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Neural network inspired lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full"></div>
                <div className="absolute w-[40%] h-[40%] border-2 border-white/30 rounded-full"></div>
                <div className="absolute w-[20%] h-[20%] bg-white/40 rounded-full"></div>
              </div>
              
              {/* Trend icon in the foreground */}
              <TrendingUp 
                className={cn(
                  "text-white relative z-10",
                  size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
                )} 
              />
            </div>
          </div>
          <span 
            className={cn(
              "font-bold tracking-tight text-slate-900 dark:text-white",
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl'
            )}
          >
            Renewlytics
          </span>
        </div>
        <div 
          className={cn(
            "text-slate-600 dark:text-slate-400 tracking-wider uppercase",
            size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
          )}
        >
          Predict • Prevent • Retain
        </div>
      </div>
    );
  }

  // Default variant with text and icon
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-700 to-renewal-500",
          sizeClasses[size],
          "aspect-square"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Neural network inspired lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full"></div>
            <div className="absolute w-[40%] h-[40%] border-2 border-white/30 rounded-full"></div>
            <div className="absolute w-[20%] h-[20%] bg-white/40 rounded-full"></div>
          </div>
          
          {/* Trend icon in the foreground */}
          <TrendingUp 
            className={cn(
              "text-white relative z-10",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
            )} 
          />
        </div>
      </div>
      <span 
        className={cn(
          "font-bold tracking-tight text-slate-900 dark:text-white",
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl'
        )}
      >
        Renewlytics
      </span>
    </div>
  );
};
