
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange';
type LayoutDensity = 'comfortable' | 'compact' | 'spacious';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  layoutDensity: LayoutDensity;
  setLayoutDensity: (density: LayoutDensity) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const defaultContext: ThemeContextType = {
  themeMode: 'system',
  setThemeMode: () => {},
  colorScheme: 'blue',
  setColorScheme: () => {},
  layoutDensity: 'comfortable',
  setLayoutDensity: () => {},
  isSettingsOpen: false,
  setIsSettingsOpen: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');
  const [layoutDensity, setLayoutDensity] = useState<LayoutDensity>('comfortable');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize from localStorage if available
  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme | null;
    const savedLayoutDensity = localStorage.getItem('layoutDensity') as LayoutDensity | null;
    
    if (savedThemeMode) setThemeMode(savedThemeMode);
    if (savedColorScheme) setColorScheme(savedColorScheme);
    if (savedLayoutDensity) setLayoutDensity(savedLayoutDensity);
    
    // Apply the theme mode
    applyThemeMode(savedThemeMode || 'system');
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('colorScheme', colorScheme);
    localStorage.setItem('layoutDensity', layoutDensity);
    
    // Apply the theme mode
    applyThemeMode(themeMode);
  }, [themeMode, colorScheme, layoutDensity]);

  // Apply CSS classes based on theme mode
  const applyThemeMode = (mode: ThemeMode) => {
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    
    // Apply color scheme
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    
    // Apply layout density
    document.documentElement.setAttribute('data-layout-density', layoutDensity);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        colorScheme,
        setColorScheme,
        layoutDensity,
        setLayoutDensity,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
