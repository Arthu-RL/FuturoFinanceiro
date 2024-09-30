import type { BalanceProviderState } from '@/@types/balance';
import type { ThemeProviderState } from '@/@types/theme';
import { createContext } from 'react';
import { ModalProviderState } from '@/@types/TransactionModal';

const balanceInitialState: BalanceProviderState = { balance: 1000, updateBalance: (value: number) => value };
const themeInitialState: ThemeProviderState = { theme: 'dark', updateTheme: () => null };
const modalIntialState: ModalProviderState = { isModalOpen: false,  openModal: () => null, closeModal: () => null}

const BalanceContext = createContext<BalanceProviderState>(balanceInitialState);
const ThemeContext = createContext<ThemeProviderState>(themeInitialState);

const TransactionModalContext = createContext<ModalProviderState>(modalIntialState);

export { BalanceContext, ThemeContext, TransactionModalContext };
