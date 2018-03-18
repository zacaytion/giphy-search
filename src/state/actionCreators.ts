import { Action } from 'history';
import { ActionCreator } from 'redux';
import { IGIFObject } from '../services';
import * as types from './actionTypes';
import TypeKeys from './typeKeys';

export type TSearchGIFs = typeof searchGIFs;
export const searchGIFs: ActionCreator<types.GIFSearchAction> = (
  term: string,
  offset: number = 0,
) => {
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
export const trendingGIFs: ActionCreator<types.GIFTrendingAction> = (offset: number = 0) => ({
  payload: {
    offset,
  },
  type: TypeKeys.GIFS_TRENDING,
});

export type TSetGIFs = typeof setGIFs;
export const setGIFs: ActionCreator<types.GIFSetAction> = (
  gifs: IGIFObject[],
  gifType: types.GIFTypes,
) => ({
  payload: {
    gifType,
    gifs,
  },
  type: TypeKeys.GIFS_SET,
});

export type TClearGIFs = typeof clearGIFs;
export const clearGIFs: ActionCreator<types.GIFSClearAction> = (gifType: types.GIFTypes) => ({
  payload: {
    gifType,
  },
  type: TypeKeys.GIFS_CLEAR,
});

export type TAddSearchTerm = typeof addSearchTerm;
export const addSearchTerm: ActionCreator<types.SearchAddAction> = (searchTerm: string) => ({
  payload: {
    searchTerm,
  },
  type: TypeKeys.SEARCH_ADD,
});

export type TRemoveSearchTerm = typeof removeSearchTerm;
export const removeSearchTerm: ActionCreator<types.SearchRemoveAction> = () => ({
  type: TypeKeys.SEARCH_REMOVE,
});

export type TClearSearch = typeof clearSearch;
export const clearSearch: ActionCreator<types.SearchClearAction> = () => ({
  type: TypeKeys.SEARCH_CLEAR,
});

export type TSetError = typeof setError;
export const setError: ActionCreator<types.ErrorSetAction> = (err: any) => ({
  payload: { err },
  type: TypeKeys.ERROR_SET,
});

export type TClearErrors = typeof clearErrors;
export const clearErrors: ActionCreator<types.ErrorClearAction> = () => ({
  type: TypeKeys.ERROR_CLEAR,
});
