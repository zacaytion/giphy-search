import { RouterState } from 'react-router-redux';
import { IGIFObject } from '../services';
import TypeKeys from './typeKeys';

export interface IFetchingState {
  searching: boolean;
  trending: boolean;
}

export interface ISearchState {
  current: string | null;
  previous: string[];
}

export interface IGIFSState {
  [TypeKeys.GIFS_SEARCH]: IGIFObject[];
  [TypeKeys.GIFS_TRENDING]: IGIFObject[];
}

export interface IPaginationState {
  [TypeKeys.GIFS_SEARCH]: number;
  [TypeKeys.GIFS_TRENDING]: number;
}

export interface IErrorState {
  errors: any[];
}

export interface IAppState {
  error: IErrorState;
  fetching: IFetchingState;
  gifs: IGIFSState;
  pagination: IPaginationState;
  routing: RouterState;
  searching: ISearchState;
}

export const INITIAL_FETCHING_STATE: IFetchingState = {
  searching: false,
  trending: false,
};

export const INITIAL_ERROR_STATE: IErrorState = {
  errors: [],
};

export const INITIAL_GIFS_STATE: IGIFSState = {
  [TypeKeys.GIFS_SEARCH]: [],
  [TypeKeys.GIFS_TRENDING]: [],
};

export const INITIAL_PAGINATION_STATE: IPaginationState = {
  [TypeKeys.GIFS_SEARCH]: 0,
  [TypeKeys.GIFS_TRENDING]: 0,
};
export const INITIAL_ROUTER_STATE: RouterState = {
  location: null,
};

export const INITIAL_SEARCHING_STATE: ISearchState = {
  current: null,
  previous: ['James Bond'],
  // previous: [] as string[],
};

export const initialState: IAppState = {
  error: INITIAL_ERROR_STATE,
  fetching: INITIAL_FETCHING_STATE,
  gifs: INITIAL_GIFS_STATE,
  pagination: INITIAL_PAGINATION_STATE,
  routing: INITIAL_ROUTER_STATE,
  searching: INITIAL_SEARCHING_STATE,
};
