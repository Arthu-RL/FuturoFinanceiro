import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCallback, useEffect, useState } from 'react';
import { User, userSchema } from '@/lib/schemas/user.schema';
import { UserData } from '@/providers/userAccountProvider';

export const useCreateUserAccount = (userInitialState: User) => {
  const { setStorageItem, getStorageItem } = useLocalStorage<UserData['user']>(userSchema);
  const [userData, setUserData] = useState<UserData['user']>(getStorageItem('userData') ?? userInitialState);

  const updateUser = useCallback(
    (user: User) => {
      setStorageItem('userData', user);
      const userData = getStorageItem('userData');
      if (userData) setUserData(userData);
    },
    [getStorageItem, setStorageItem],
  );

  useEffect(() => {
    if (!getStorageItem('userData')) updateUser(userInitialState);
  }, [userInitialState, updateUser, getStorageItem, setStorageItem]);

  return { user: userData, updateUser };
};
