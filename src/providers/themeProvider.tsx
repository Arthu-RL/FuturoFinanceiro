import type { Theme, ThemeProviderProps } from '@/@types/theme';
import { useEffect, useState } from 'react';
import { ThemeContext } from './providers';

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) => {
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

  return (
    <ThemeContext.Provider {...props} value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
