
import React from 'react';
import { cn } from '@/lib/utils';

interface TaglineElementProps {
  size: 'sm' | 'md' | 'lg';
}

export const TaglineElement: React.FC<TaglineElementProps> = ({ size }) => {
  return (
    <div 
      className={cn(
        "text-slate-600 dark:text-slate-400 tracking-wider uppercase font-medium",
        size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
      )}
    >
      Predict • Prevent • Retain
    </div>
  );
};
