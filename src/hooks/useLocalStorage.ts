import { z } from 'zod';

export const useLocalStorage = <T>(schema: z.Schema) => {
  function getStorageItem(storageKey: string): T | null {
    const storageItem = schema.safeParse(JSON.parse(localStorage.getItem(storageKey) || String([])));

    if (!storageItem.success) {
      const errors = storageItem.error.flatten();
      console.error(errors);
      return null;
    }

    return storageItem.data;
  }

  function setStorageItem(storageKey: string, value: T): T | null {
    const storageValue = schema.safeParse(value);

    if (!storageValue.success) {
      const errors = storageValue.error.flatten();
      console.error(errors);
      return null;
    }

    localStorage.setItem(storageKey, JSON.stringify(storageValue.data));
    return storageValue.data;
  }

  return { getStorageItem, setStorageItem };
};
