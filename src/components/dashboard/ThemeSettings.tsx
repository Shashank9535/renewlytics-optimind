
import React from 'react';
import { X, Moon, Sun, Laptop, Layout, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ThemeSettings() {
  const { 
    themeMode, 
    setThemeMode, 
    colorScheme, 
    setColorScheme, 
    layoutDensity, 
    setLayoutDensity,
    isSettingsOpen,
    setIsSettingsOpen
  } = useTheme();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/50 flex justify-end animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xs h-full shadow-lg overflow-y-auto animate-slide-in-right">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-semibold">Dashboard Settings</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Mode */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme Mode</h3>
            <div className="flex flex-col gap-2">
              <Toggle 
                variant="outline" 
                pressed={themeMode === 'light'} 
                className="justify-start w-full"
                onClick={() => setThemeMode('light')}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Toggle>
              <Toggle
                variant="outline"
                pressed={themeMode === 'dark'}
                className="justify-start w-full"
                onClick={() => setThemeMode('dark')}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Toggle>
              <Toggle
                variant="outline" 
                pressed={themeMode === 'system'} 
                className="justify-start w-full"
                onClick={() => setThemeMode('system')}
              >
                <Laptop className="h-4 w-4 mr-2" />
                System
              </Toggle>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Color Scheme</h3>
            <RadioGroup value={colorScheme} onValueChange={(value) => setColorScheme(value as any)}>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blue" id="blue" />
                  <Label htmlFor="blue" className="flex items-center">
                    <span className="h-4 w-4 rounded-full bg-renewal-500 mr-2"></span>
                    Blue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="purple" id="purple" />
                  <Label htmlFor="purple" className="flex items-center">
                    <span className="h-4 w-4 rounded-full bg-purple-500 mr-2"></span>
                    Purple
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="green" id="green" />
                  <Label htmlFor="green" className="flex items-center">
                    <span className="h-4 w-4 rounded-full bg-emerald-500 mr-2"></span>
                    Green
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label htmlFor="orange" className="flex items-center">
                    <span className="h-4 w-4 rounded-full bg-orange-500 mr-2"></span>
                    Orange
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Layout Density */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Layout Density</h3>
            <RadioGroup value={layoutDensity} onValueChange={(value) => setLayoutDensity(value as any)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="comfortable" />
                  <Label htmlFor="comfortable">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="spacious" />
                  <Label htmlFor="spacious">Spacious</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
