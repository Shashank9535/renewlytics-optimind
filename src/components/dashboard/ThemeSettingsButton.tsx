
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeSettingsButton() {
  const { setIsSettingsOpen } = useTheme();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="h-9 w-9 rounded-full" 
      onClick={() => setIsSettingsOpen(true)}
      title="Customize dashboard"
    >
      <Settings className="h-4 w-4" />
    </Button>
  );
}
