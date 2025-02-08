const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  tmdb: {
    apiKey: getEnvVar('NEXT_PUBLIC_TMDB_KEY'),
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
  },
  alan: {
    key: getEnvVar('NEXT_PUBLIC_ALAN_SDK_KEY'),
  },
} as const; 