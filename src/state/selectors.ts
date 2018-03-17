import { createSelector } from 'reselect';
import { IGIFObject } from '../services';
import { GIFTypes } from './actionTypes';
import { IAppState, IGIFSState, IPaginationState } from './initial';
import TypeKeys from './typeKeys';

const gifsStateSelector = (state: IAppState): IGIFSState => state.gifs;
export const gifsSelector = (type: GIFTypes) => {
  return createSelector(gifsStateSelector, gifsState => gifsState[type]);
};

const paginationStateSelector = (state: IAppState) => state.pagination;
export const paginationSelector = (type: GIFTypes) => {
  return createSelector(paginationStateSelector, pageState => pageState[type]);
};

const searchingStateSelector = (state: IAppState) => state.searching;
export const previousSearchesSelector = createSelector(
  searchingStateSelector,
  searching => searching.previous,
);
export const currentSearchSelector = createSelector(
  searchingStateSelector,
  searching => searching.current,
);

// TODO: Is Necessary?
const fetchingStateSelector = (state: IAppState) => state.fetching;
export const isFetchingSelector = createSelector(
  fetchingStateSelector,
  fetchingState => fetchingState.isFetching,
);
