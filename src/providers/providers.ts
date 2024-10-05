import type { BalanceProviderState } from '@/@types/balance';
import type { ThemeProviderState } from '@/@types/theme';
import { createContext } from 'react';
import { ModalProviderState } from '@/@types/TransactionModal';
import { InvestmentAssetsState } from '@/@types/investment';

const balanceInitialState: BalanceProviderState = { balance: 1000, updateBalance: (value: number) => value };
const themeInitialState: ThemeProviderState = { theme: 'dark', updateTheme: () => null };
const assetsInitialState = { assets: [], updateAssets: () => {} };

const modalIntialState: ModalProviderState = {
  isModalOpen: false,
  openModal: () => null,
  closeModal: () => null,
};

const TransactionModalContext = createContext<ModalProviderState>(modalIntialState);
const BalanceContext = createContext<BalanceProviderState>(balanceInitialState);
const AssetsContext = createContext<InvestmentAssetsState>(assetsInitialState);
const ThemeContext = createContext<ThemeProviderState>(themeInitialState);

export { BalanceContext, ThemeContext, TransactionModalContext, AssetsContext };
