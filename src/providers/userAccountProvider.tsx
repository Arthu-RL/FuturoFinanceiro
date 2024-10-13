import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, userSchema } from '@/lib/schemas/user.schema';

type UserData = { user: User; updateUser: (user: User) => void };

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
  const { setStorageItem, getStorageItem } = useLocalStorage<UserData['user']>(userSchema);
  const [userData, setUserData] = useState<UserData['user']>(
    getStorageItem('userData') ?? userInitialState.user,
  );

  const updateUser = (user: User) => {
    setStorageItem('userData', user);
    const userData = getStorageItem('userData');
    if (userData) setUserData(userData);
  };

  useEffect(() => {
    if (!getStorageItem('userData')) setStorageItem('userData', userInitialState.user);
  }, [getStorageItem, setStorageItem]);

  return (
    <UserAccountProviderContext.Provider value={{ updateUser, user: userData }}>
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
