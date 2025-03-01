
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Zap, Brain } from 'lucide-react';

interface RenewlyticsLogoProps {
  variant?: 'default' | 'icon-only' | 'with-tagline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export const RenewlyticsLogo: React.FC<RenewlyticsLogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  animated = true,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (animated && iconRef.current) {
      const icon = iconRef.current;
      
      const handleMouseEnter = () => {
        icon.classList.add('scale-110');
        icon.style.transition = 'transform 0.3s ease-out';
      };
      
      const handleMouseLeave = () => {
        icon.classList.remove('scale-110');
        icon.style.transition = 'transform 0.3s ease-in';
      };
      
      icon.addEventListener('mouseenter', handleMouseEnter);
      icon.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        icon.removeEventListener('mouseenter', handleMouseEnter);
        icon.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [animated]);

  // Calculate size classes
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  // Base icon element with the neural network design
  const IconElement = () => (
    <div 
      ref={iconRef}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-renewal-800 via-renewal-600 to-renewal-400 shadow-lg",
        sizeClasses[size],
        "aspect-square",
        variant === 'default' && "hover:shadow-renewal-500/40"
      )}
    >
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-[1px]"></div>
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
        {/* Neural network design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute w-[40%] h-[40%] border-2 border-white/30 rounded-full"></div>
          <div className="absolute w-[20%] h-[20%] bg-white/40 rounded-full"></div>
        </div>
        
        {/* Icon layers */}
        <div className="relative z-10 flex items-center justify-center">
          <Brain 
            className={cn(
              "text-white/60 absolute",
              size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-7 w-7',
              animated && "animate-bounce-slow"
            )} 
          />
          <Zap 
            className={cn(
              "text-white absolute",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6',
              animated && "animate-pulse"
            )} 
          />
          <TrendingUp 
            className={cn(
              "text-white relative",
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6',
              animated && "animate-fade-in"
            )} 
          />
        </div>
      </div>
    </div>
  );

  // Text element with the Renewlytics name
  const TextElement = () => (
    <span 
      className={cn(
        "font-bold tracking-tight bg-gradient-to-r from-renewal-700 to-renewal-500 text-transparent bg-clip-text transition-all hover:from-renewal-600 hover:to-renewal-400",
        size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl'
      )}
    >
      Renewlytics
    </span>
  );

  // Tagline element
  const TaglineElement = () => (
    <div 
      className={cn(
        "text-slate-600 dark:text-slate-400 tracking-wider uppercase",
        size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
      )}
    >
      Predict • Prevent • Retain
    </div>
  );

  // Render appropriate variant
  if (variant === 'icon-only') {
    return <IconElement />;
  }

  if (variant === 'with-tagline') {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="flex items-center gap-2 mb-1">
          <IconElement />
          <TextElement />
        </div>
        <TaglineElement />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconElement />
      <TextElement />
    </div>
  );
};
