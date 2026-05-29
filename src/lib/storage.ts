export const LOCAL_STORAGE_EVENT = 'whack-a-mole-storage-change';

export const subscribeToLocalStorage = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(LOCAL_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LOCAL_STORAGE_EVENT, callback);
  };
};

export const notifyLocalStorageChange = () => {
  window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
};

export const loadHighScore = (key: string, fallback = 0): number => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? Number(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const saveHighScore = (key: string, score: number) => {
  try {
    localStorage.setItem(key, String(score));
    notifyLocalStorageChange();
  } catch {
    // LocalStorage can be unavailable in privacy-restricted browsers.
  }
};

export const loadSettings = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveSettings = <T>(key: string, settings: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(settings));
    notifyLocalStorageChange();
  } catch {
    // LocalStorage can be unavailable in privacy-restricted browsers.
  }
};
