
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Zap, Brain } from 'lucide-react';

interface IconElementProps {
  size: 'sm' | 'md' | 'lg';
  animated?: boolean;
  variant?: 'default' | 'icon-only' | 'with-tagline';
}

export const IconElement: React.FC<IconElementProps> = ({
  size,
  animated = true,
  variant = 'default'
}) => {
  // Calculate size classes
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-800 via-renewal-600 to-renewal-400 shadow-lg",
        sizeClasses[size],
        "aspect-square",
        variant === 'default' && "hover:shadow-renewal-500/40",
        animated && "transition-transform hover:scale-110 duration-300"
      )}
    >
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-[1px]"></div>
      <div className="relative flex items-center justify-center">
        <Brain 
          className={cn(
            "text-white/80 absolute",
            size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-7 w-7',
            animated && "animate-bounce-slow"
          )} 
        />
        <TrendingUp 
          className={cn(
            "text-white",
            size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6',
            animated && "animate-fade-in"
          )} 
        />
      </div>
    </div>
  );
};
