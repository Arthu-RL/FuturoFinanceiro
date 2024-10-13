import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
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

  const updateUser = useCallback(
    (user: User) => {
      setStorageItem('userData', user);
      const userData = getStorageItem('userData');
      if (userData) setUserData(userData);
    },
    [getStorageItem, setStorageItem],
  );

  useEffect(() => {
    if (!getStorageItem('userData')) updateUser(userInitialState.user);
  }, [updateUser, getStorageItem, setStorageItem]);

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
