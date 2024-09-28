import type { BalanceProviderState } from '@/@types/balance';
import type { ThemeProviderState } from '@/@types/theme';
import { createContext } from 'react';

const balanceInitialState: BalanceProviderState = { balance: 1000, setBalance: (value: number) => value };
const themeInitialState: ThemeProviderState = { theme: 'dark', updateTheme: () => null };

const BalanceContext = createContext<BalanceProviderState>(balanceInitialState);
const ThemeContext = createContext<ThemeProviderState>(themeInitialState);

export { BalanceContext, ThemeContext };
