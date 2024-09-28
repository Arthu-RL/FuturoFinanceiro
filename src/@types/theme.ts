type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  storageKey?: string;
  defaultTheme?: Theme;
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
};

export type { Theme, ThemeProviderProps, ThemeProviderState };
