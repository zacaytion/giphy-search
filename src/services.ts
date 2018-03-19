import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from './config';

axios.defaults.baseURL = config.giphyBaseUrl;

export async function searchForGIFs(payload: { term: string; offset: number }) {
  try {
    const { term, offset } = payload;
    const q = term.replace(/\s/g, '+'); /* replace spaces with `+` */
    const params = {
      api_key: config.giphyAPIKey,
      limit: 50,
      offset,
      q,
    };
    const response = await axios.get<IGIPHYResponse>('/search', {
      params,
    });
    return response.data;
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error Searching GIPHY');
  }
}

export async function fetchTrendingGIFs(payload: { offset: number }) {
  try {
    const { offset } = payload;
    const params = {
      api_key: config.giphyAPIKey,
      limit: 50,
      offset,
    };
    const response = await axios.get<IGIPHYResponse>('/trending', {
      params,
    });
    return response.data;
  } catch (e) {
    console.error(e); /* tslint:disable-line:no-console */
    throw Error('Error fetching Trending GIFs from GIPHY');
  }
}

export interface IGIPHYResponse {
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
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_height_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_small_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized_large: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  original: {
    url: string;
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  original_still: {
    url: string;
    width: string;
    height: string;
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
