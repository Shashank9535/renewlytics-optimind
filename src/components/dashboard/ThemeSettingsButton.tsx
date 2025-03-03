
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeSettingsButton() {
  const { setIsSettingsOpen } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800" 
            onClick={() => setIsSettingsOpen(true)}
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Customize dashboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
