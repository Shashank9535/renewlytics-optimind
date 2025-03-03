
import React from 'react';
import { cn } from '@/lib/utils';
import { IconElement } from './logo/IconElement';
import { TextElement } from './logo/TextElement';
import { TaglineElement } from './logo/TaglineElement';

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
  // Render appropriate variant
  if (variant === 'icon-only') {
    return <IconElement size={size} animated={animated} variant={variant} />;
  }

  if (variant === 'with-tagline') {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="flex items-center gap-2">
          <IconElement size={size} animated={animated} variant={variant} />
          <TextElement size={size} />
        </div>
        <TaglineElement size={size} />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconElement size={size} animated={animated} variant={variant} />
      <TextElement size={size} />
    </div>
  );
};
