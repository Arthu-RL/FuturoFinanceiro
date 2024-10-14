import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';
import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  storageKey?: string;
  defaultTheme?: Theme;
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState>({ theme: 'dark', updateTheme: () => null });

const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) => {
  const { theme, updateTheme } = useThemeSwitcher(storageKey, defaultTheme);

  return (
    <ThemeContext.Provider {...props} value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export { ThemeProvider, useTheme };
