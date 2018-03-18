
const config = {
  env: process.env.NODE_ENV || 'development',
  giphyAPIKey: 'iFHeQEBrsm3I08PUvhRjuShzBDVpJMZI',
  giphyBaseUrl: 'http://localhost:3000/giphy',
  isBrowser: typeof window !== 'undefined',
  isDev: process.env.NODE_ENV !== 'production',
};

export default config;
