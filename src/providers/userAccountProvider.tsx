import { createContext, ReactNode, useContext } from 'react';
import { User } from '@/lib/schemas/user.schema';
import { useCreateUserAccount } from '@/hooks/useCreateUserAccount';

export type UserData = { user: User; updateUser: (user: User) => void };

const userInitialState = {
  updateUser: () => {},
  user: {
    currentBalance: 1000,
    currentProfitability: 0,
    currentWallet: [],
    transactionHistory: [],
    balanceHistory: [],
    profitabilityHistory: [],
    walletHistory: [],
  },
};

const UserAccountProviderContext = createContext<UserData>(userInitialState);

const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useCreateUserAccount(userInitialState.user);

  return (
    <UserAccountProviderContext.Provider value={{ user, updateUser }}>
      {children}
    </UserAccountProviderContext.Provider>
  );
};

const useUserAccount = () => {
  const context = useContext(UserAccountProviderContext);
  if (!context) throw new Error('useUserAccount must be used within a UserAccountProvider');
  return context;
};

export { UserAccountProvider, useUserAccount };
