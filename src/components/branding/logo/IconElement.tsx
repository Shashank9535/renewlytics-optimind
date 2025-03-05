
import React from 'react';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

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
        "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-700 via-teal-600 to-green-500 shadow-lg",
        sizeClasses[size],
        "aspect-square",
        variant === 'default' && "hover:shadow-teal-500/40",
        animated && "transition-transform hover:scale-110 duration-300"
      )}
    >
      <BrainCircuit 
        className={cn(
          "text-white",
          size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-7 w-7',
          animated && "animate-pulse"
        )} 
      />
    </div>
  );
};
