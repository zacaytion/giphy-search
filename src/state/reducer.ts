import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  ActionTypes,
  GIFSClearAction,
  GIFSetAction,
  PaginationClearAction,
  PaginationSetAction,
} from './actionTypes';
import {
  IAppState,
  IFetchingState,
  IGIFSState,
  INITIAL_FETCHING_STATE,
  INITIAL_GIFS_STATE,
  INITIAL_PAGINATION_STATE,
  INITIAL_SEARCHING_STATE,
  IPaginationState,
  ISearchState,
} from './initial';
import TypeKeys from './typeKeys';

// TODO: Create SEARCH_REMOVE action to clear current term and add to previous
const searching = (
  state: ISearchState = INITIAL_SEARCHING_STATE,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TypeKeys.SEARCH_ADD:
      return {
        previous: [action.payload.searchTerm, ...state.previous],
      };
    case TypeKeys.SEARCH_CLEAR:
      return {
        previous: [],
      };
    default:
      return state;
  }
};

// TODO: Maybe Remove?
const fetching = (
  state: IFetchingState = INITIAL_FETCHING_STATE,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TypeKeys.FETCHING:
      return { isFetching: !state.isFetching, ...state };
    default:
      return state;
  }
};

const gifsReducer = (
  state: IGIFSState = INITIAL_GIFS_STATE,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TypeKeys.GIFS_SET:
      return setGIFs(state, action);
    case TypeKeys.GIFS_CLEAR:
      return clearGIFs(state, action);
    default:
      return state;
  }
};

function setGIFs(state: IGIFSState, action: GIFSetAction) {
  const { gifType, gifs } = action.payload;
  return {
    [gifType]: [...state[gifType], ...gifs],
    ...state,
  };
}

function clearGIFs(state: IGIFSState, action: GIFSClearAction) {
  const { gifType } = action.payload;
  return {
    [gifType]: [],
    ...state,
  };
}
const pagination = (
  state: IPaginationState = INITIAL_PAGINATION_STATE,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TypeKeys.PAGINATION_SET:
      return setPagination(state, action);
    case TypeKeys.PAGINATION_CLEAR:
      return clearPagination(state, action);
    default:
      return state;
  }
};

function setPagination(state: IPaginationState, action: PaginationSetAction) {
  const { requestType } = action.payload;
  return {
    [requestType]: (state[requestType] += 25),
    ...state,
  };
}

function clearPagination(
  state: IPaginationState,
  action: PaginationClearAction,
) {
  const { requestType } = action.payload;
  return {
    [requestType]: 0,
    ...state,
  };
}

export const rootReducer = combineReducers<IAppState>({
  fetching,
  gifs: gifsReducer,
  pagination,
  routing,
  searching,
});
