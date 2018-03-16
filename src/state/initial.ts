import { RouterState } from 'react-router-redux';
import { IGIFObject } from '../services';
import TypeKeys from './typeKeys';

export interface  IFetchingState {
  isFetching: boolean;
}

export interface IGIFSState {
  [TypeKeys.GIFS_SEARCH]: IGIFObject[];
  [TypeKeys.GIFS_TRENDING]: IGIFObject[];
}

export interface IPaginationState {
  [TypeKeys.GIFS_SEARCH]: number;
  [TypeKeys.GIFS_TRENDING]: number;
}

export interface IAppState {
  fetching: IFetchingState;
  gifs: IGIFSState;
  pagination: IPaginationState;
  routing: RouterState;
}

export const INITIAL_FETCHING_STATE: IFetchingState = {
  isFetching: false,
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

export const initialState: IAppState = {
  fetching: INITIAL_FETCHING_STATE,
  gifs: INITIAL_GIFS_STATE,
  pagination: INITIAL_PAGINATION_STATE,
  routing: INITIAL_ROUTER_STATE,
};
