const TOKEN_STORAGE = 'florasearch-token';

export const saveTokenToLocalStorage = token => {
  localStorage.setItem(TOKEN_STORAGE, token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_STORAGE);
};

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE);
};
