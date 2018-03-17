import { merge } from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  giphyAPIKey: process.env.GIPHY_API_KEY,
  giphyBaseUrl: 'http://api.giphy.com/v1/',
  isBrowser: typeof window !== 'undefined',
  isDev: process.env.NODE_ENV !== 'production',
};

export default config;
