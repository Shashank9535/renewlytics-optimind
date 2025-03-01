
import React, { useRef, useEffect } from 'react';
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

  return (
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
};
