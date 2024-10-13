import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, userSchema } from '@/lib/schemas/user.schema';

type UserData = { userData: User; updateUser: (user: User) => void };

const userInitialState = {
  updateUser: () => {},
  userData: {
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
  const { setStorageItem, getStorageItem } = useLocalStorage<UserData['userData']>(userSchema);
  const [userData] = useState<UserData['userData']>(getStorageItem('userData') ?? userInitialState.userData);

  const updateUser = (user: User) => setStorageItem('userData', user);

  useEffect(() => {
    if (!getStorageItem('userData')) setStorageItem('userData', userInitialState.userData);
  }, [getStorageItem, setStorageItem]);

  return (
    <UserAccountProviderContext.Provider value={{ updateUser, userData }}>
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
