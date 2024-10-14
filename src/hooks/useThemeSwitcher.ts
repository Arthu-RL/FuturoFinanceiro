import { Theme } from '@/providers/themeProvider';
import { useEffect, useState } from 'react';

export const useThemeSwitcher = (storageKey: string, defaultTheme: string) => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem(storageKey) as Theme) || defaultTheme);

  function updateTheme(theme: Theme) {
    localStorage.setItem(storageKey, theme);
    setTheme(theme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return { theme, updateTheme };
};
