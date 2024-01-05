interface TokenData {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_STORAGE_KEY = 'authToken';

export const getTokenData = (): TokenData | null => {
  const tokenDataString = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!tokenDataString) {
    return null;
  }

  return JSON.parse(tokenDataString) as TokenData;
};

export const setTokenData = (tokenData: TokenData) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
};

export const clearTokenData = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
