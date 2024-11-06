import { Assets } from '@/lib/schemas/assets.schema';

function isQuotaExceededError(err: unknown) {
  return (
    err instanceof DOMException &&
    (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  );
}

function isLocalStorageAvailable(key: string, value: string) {
  try {
    const storage = window.localStorage;
    if (!storage) return false;

    storage.setItem(key, value);
    storage.removeItem(key);

    return true;
  } catch (err) {
    const isValidQuotaExceededError = !(isQuotaExceededError(err) && window.localStorage.length > 0);
    return isValidQuotaExceededError;
  }
}

function pruneAssetHistory(assets: unknown) {
  return (assets as Assets[]).map((asset) => ({ ...asset, history: asset.history.slice(-150) }));
}

export { isLocalStorageAvailable, pruneAssetHistory };
