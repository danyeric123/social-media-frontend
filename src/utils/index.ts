export const setLocalStorage = (key: string, value: string) => {
  const item = {
    value,
    expiry: Date.now() + 3600 * 1000 * 23,
  };

  localStorage.setItem(key, JSON.stringify(item));
};
