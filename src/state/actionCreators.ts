import { IGIFObject } from '../services';
import * as types from './actionTypes';
import TypeKeys from './typeKeys';

export type TSearchGIFs = typeof searchGIFs;
export const searchGIFs = (
  term: string,
  offset: number = 0,
): types.GIFSearchAction => {
  const q = term.replace(/\s/g, '+'); /* replace spaces with `+` */
  return {
    payload: {
      offset,
      q,
    },
    type: TypeKeys.GIFS_SEARCH,
  };
};

export type TTrendingGIFs = typeof trendingGIFs;
export const trendingGIFs = (offset: number = 0): types.GIFTrendingAction => ({
  payload: {
    offset,
  },
  type: TypeKeys.GIFS_TRENDING,
});

export type TSetGIFs = typeof setGIFs;
export const setGIFs = (
  gifs: IGIFObject[],
  gifType: types.GIFTypes,
): types.GIFSetAction => ({
  payload: {
    gifType,
    gifs,
  },
  type: TypeKeys.GIFS_SET,
});

export type TClearGIFs = typeof clearGIFs;
export const clearGIFs = (gifType: types.GIFTypes): types.GIFSClearAction => ({
  payload: {
    gifType,
  },
  type: TypeKeys.GIFS_CLEAR,
});

export type TFetching = typeof fetching;
export const fetching = (): types.FetchingAction => ({
  type: TypeKeys.FETCHING,
});

export type TSetPagination = typeof setPagination;
export const setPagination = (
  requestType: types.GIFTypes,
): types.PaginationSetAction => ({
  payload: {
    requestType,
  },
  type: TypeKeys.PAGINATION_SET,
});

export type TClearPagination = typeof clearPagination;
export const clearPagination = (
  requestType: types.GIFTypes,
): types.PaginationClearAction => ({
  payload: {
    requestType,
  },
  type: TypeKeys.PAGINATION_CLEAR,
});

export type TAddSearchTerm = typeof addSearchTerm;
export const addSearchTerm = (searchTerm: string): types.SearchAddAction => ({
  payload: {
    searchTerm,
  },
  type: TypeKeys.SEARCH_ADD,
});

export const removeSearchTerm = (): types.SearchRemoveAction => ({
  type: TypeKeys.SEARCH_REMOVE,
});

export type TClearSearch = typeof clearSearch;
export const clearSearch = (): types.SearchClearAction => ({
  type: TypeKeys.SEARCH_CLEAR,
});
