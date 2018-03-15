import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.giphyBaseUrl;

export async function searchForGIFs(q: string, offset: number = 0) {
  try {
    const options = {
      method: 'get',
      params: {
        api_key: config.giphyAPIKey,
        offset,
        q,
      },
      url: '/gifs/search',
    };
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error Searching GIPHY');
  }
}

export async function fetchTrendingGIFs(offset: number = 0) {
  try {
    const options = {
      method: 'get',
      params: {
        api_key: config.giphyAPIKey,
        offset,
      },
      url: '/gifs/trending',
    };
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error fetching Trending GIFs from GIPHY');
  }
}
