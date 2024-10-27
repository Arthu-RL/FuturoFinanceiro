import { z } from 'zod';

export const useLocalStorage = <T>(schema: z.Schema<T>) => {
  type TData = z.infer<typeof schema>;

  function getStorageItem(storageKey: string): TData | null {
    const storageItem = schema.safeParse(JSON.parse(String(localStorage.getItem(storageKey))));

    if (!storageItem.success) {
      const errors = storageItem.error.flatten();
      console.error(errors);
      return null;
    }

    return storageItem.data;
  }

  function setStorageItem(storageKey: string, value: TData): null {
    const storageValue = schema.safeParse(value);

    if (!storageValue.success) {
      const errors = storageValue.error.flatten();
      console.error(errors);
      return null;
    }

    localStorage.setItem(storageKey, JSON.stringify(storageValue.data));
    return null;
  }

  return { getStorageItem, setStorageItem };
};
