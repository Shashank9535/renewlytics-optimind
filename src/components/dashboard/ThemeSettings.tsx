
import React from 'react';
import { X, Moon, Sun, Laptop, Layout, Palette, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

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

  // Function to handle settings reset
  const handleResetSettings = () => {
    setThemeMode('system');
    setColorScheme('blue');
    setLayoutDensity('comfortable');
    toast({
      title: "Settings reset",
      description: "Your dashboard preferences have been reset to default values.",
    });
  };

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/50 flex justify-end animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xs h-full shadow-lg overflow-y-auto animate-slide-in-right">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4 text-slate-500" />
            Dashboard Settings
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(false)} className="rounded-full h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Mode */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                Theme Mode
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {themeMode === 'light' ? 'Light' : themeMode === 'dark' ? 'Dark' : 'System'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={themeMode === 'light' ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-col h-auto py-3 gap-2",
                  themeMode === 'light' && "border-2 border-renewal-500"
                )}
                onClick={() => setThemeMode('light')}
              >
                <Sun className="h-5 w-5" />
                <span className="text-xs">Light</span>
              </Button>
              <Button 
                variant={themeMode === 'dark' ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-col h-auto py-3 gap-2",
                  themeMode === 'dark' && "border-2 border-renewal-500"
                )}
                onClick={() => setThemeMode('dark')}
              >
                <Moon className="h-5 w-5" />
                <span className="text-xs">Dark</span>
              </Button>
              <Button 
                variant={themeMode === 'system' ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-col h-auto py-3 gap-2",
                  themeMode === 'system' && "border-2 border-renewal-500"
                )}
                onClick={() => setThemeMode('system')}
              >
                <Laptop className="h-5 w-5" />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Color Scheme */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Palette className="h-4 w-4 text-purple-500" />
                Color Scheme
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded capitalize">
                {colorScheme}
              </div>
            </div>
            <RadioGroup value={colorScheme} onValueChange={(value) => setColorScheme(value as any)} className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 flex flex-col items-center space-y-2 relative">
                <div 
                  className={cn(
                    "h-6 w-6 rounded-full bg-renewal-500",
                    colorScheme === 'blue' && "ring-2 ring-offset-2 ring-renewal-500"
                  )}
                />
                <RadioGroupItem value="blue" id="blue" className="sr-only" />
                <Label htmlFor="blue" className="text-xs">Blue</Label>
                {colorScheme === 'blue' && (
                  <CheckCircle2 className="h-4 w-4 text-renewal-500 absolute top-1 right-1" />
                )}
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 flex flex-col items-center space-y-2 relative">
                <div 
                  className={cn(
                    "h-6 w-6 rounded-full bg-purple-500",
                    colorScheme === 'purple' && "ring-2 ring-offset-2 ring-purple-500"
                  )} 
                />
                <RadioGroupItem value="purple" id="purple" className="sr-only" />
                <Label htmlFor="purple" className="text-xs">Purple</Label>
                {colorScheme === 'purple' && (
                  <CheckCircle2 className="h-4 w-4 text-purple-500 absolute top-1 right-1" />
                )}
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 flex flex-col items-center space-y-2 relative">
                <div 
                  className={cn(
                    "h-6 w-6 rounded-full bg-emerald-500",
                    colorScheme === 'green' && "ring-2 ring-offset-2 ring-emerald-500"
                  )}
                />
                <RadioGroupItem value="green" id="green" className="sr-only" />
                <Label htmlFor="green" className="text-xs">Green</Label>
                {colorScheme === 'green' && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 absolute top-1 right-1" />
                )}
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 flex flex-col items-center space-y-2 relative">
                <div 
                  className={cn(
                    "h-6 w-6 rounded-full bg-orange-500",
                    colorScheme === 'orange' && "ring-2 ring-offset-2 ring-orange-500"
                  )}
                />
                <RadioGroupItem value="orange" id="orange" className="sr-only" />
                <Label htmlFor="orange" className="text-xs">Orange</Label>
                {colorScheme === 'orange' && (
                  <CheckCircle2 className="h-4 w-4 text-orange-500 absolute top-1 right-1" />
                )}
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Layout Density */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Layout className="h-4 w-4 text-emerald-500" />
                Layout Density
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded capitalize">
                {layoutDensity}
              </div>
            </div>
            <RadioGroup value={layoutDensity} onValueChange={(value) => setLayoutDensity(value as any)} className="grid grid-cols-1 gap-2">
              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-3",
                layoutDensity === 'compact' ? "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"
              )}>
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact" className="flex flex-col">
                  <span>Compact</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Dense layout with smaller margins</span>
                </Label>
              </div>
              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-3",
                layoutDensity === 'comfortable' ? "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"
              )}>
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable" className="flex flex-col">
                  <span>Comfortable</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Balanced spacing and margins</span>
                </Label>
              </div>
              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-3",
                layoutDensity === 'spacious' ? "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"
              )}>
                <RadioGroupItem value="spacious" id="spacious" />
                <Label htmlFor="spacious" className="flex flex-col">
                  <span>Spacious</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">More breathing room between elements</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Animation Options (Placeholder for future enhancement) */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Animation Preferences</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations" className="flex items-center gap-2 text-sm">
                Enable animations
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  Coming soon
                </span>
              </Label>
              <Switch id="animations" disabled />
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResetSettings}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
