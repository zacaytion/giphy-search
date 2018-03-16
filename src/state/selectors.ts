import { createSelector } from 'reselect';
import { IGIFObject } from '../services';
import { GIFTypes } from './actionTypes';
import { IAppState, IGIFSState, IPaginationState } from './initial';
import TypeKeys from './typeKeys';

const fetchingStateSelector = (state: IAppState) => state.fetching;
const gifsStateSelector = (state: IAppState): IGIFSState => state.gifs;
const paginationStateSelector = (state: IAppState) => state.pagination;

export const gifsSelector = (type: GIFTypes ) => {
  return createSelector(
    gifsStateSelector, gifsState => gifsState[type],
  );
};

export const paginationSelector = (type: GIFTypes) => {
  return createSelector(
    paginationStateSelector, pageState => pageState[type],
  );
};

export const isFetchingSelector = createSelector(
  fetchingStateSelector,
  fetchingState => fetchingState.isFetching,
);
