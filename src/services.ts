import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from './config';

axios.defaults.baseURL = config.giphyBaseUrl;

export async function searchForGIFs(q: string, offset: number = 0)  {
  try {
    const params = {
        api_key: config.giphyAPIKey,
        offset,
        q,
    };
    return axios.get<IGIPHYResponse>('/gifs/search', { params });
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error Searching GIPHY');
  }
}

export async function fetchTrendingGIFs(offset: number = 0) {
  try {
    const params = {
      api_key: config.giphyAPIKey,
      offset,
    };
    return axios.get<IGIPHYResponse>('/gifs/trending', { params });
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error fetching Trending GIFs from GIPHY');
  }
}

interface IGIPHYResponse {
  data: IGIFObject[];
  pagination: IPaginationObject;
  meta: IMetaObject;
}

export interface IGIFObject {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  caption: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  import_datetime: string;
  trending_datetime: string;
  images: IImagesObject;
  user?: IUserObject;
}

interface IImagesObject {
  fixed_height: {
    url: string,
    width: string,
    height: string,
    size: string,
    mp4: string,
    mp4_size: string,
    webp: string,
    webp_size: string,
  };
  fixed_height_still: {
    url: string,
    width: string,
    height: string,
  };
  fixed_height_downsampled: {
    url: string,
    width: string,
    height: string,
    size: string,
    webp: string,
    webp_size: string,
  };
  fixed_width: {
    url: string,
    width: string,
    height: string,
    size: string,
    mp4: string,
    mp4_size: string,
    webp: string,
    webp_size: string,
  };
  fixed_width_still: {
    url: string,
    width: string,
    height: string,
  };
  fixed_width_downsampled: {
    url: string,
    width: string,
    height: string,
    size: string,
    webp: string,
    webp_size: string,
  };
  fixed_height_small: {
    url: string,
    width: string,
    height: string,
    size: string,
    webp: string,
    webp_size: string,
  };
  fixed_height_small_still: {
    url: string,
    width: string,
    height: string,
  };
  fixed_width_small: {
    url: string,
    width: string,
    height: string,
    size: string,
    webp: string,
    webp_size: string,
  };
  fixed_width_small_still: {
    url: string,
    width: string,
    height: string,
  };
  downsized: {
    url: string,
    width: string,
    height: string,
    size: string,
  };
  downsized_still: {
    url: string,
    width: string,
    height: string,
  };
  downsized_large: {
    url: string,
    width: string,
    height: string,
    size: string,
  };
  original: {
    url: string,
    width: string,
    height: string,
    size: string,
    frames: string,
    mp4: string,
    mp4_size: string,
    webp: string,
    webp_size: string,
  };
  original_still: {
    url: string,
    width: string,
    height: string,
  };
}

export interface IMetaObject {
  msg: string;
  status: number;
  response_id: string;
}

export interface IPaginationObject {
  offset: number;
  total_count: number;
  count: number;
}

export interface IUserObject {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  twitter: string;
}
