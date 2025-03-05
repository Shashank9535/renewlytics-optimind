
import React from 'react';
import { cn } from '@/lib/utils';

interface TextElementProps {
  size: 'sm' | 'md' | 'lg';
}

export const TextElement: React.FC<TextElementProps> = ({ size }) => {
  return (
    <span 
      className={cn(
        "font-bold tracking-tight bg-gradient-to-r from-blue-700 via-teal-600 to-green-500 text-transparent bg-clip-text transition-all duration-300",
        size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl'
      )}
    >
      Renewlytics
    </span>
  );
};
