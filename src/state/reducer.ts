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

const searching = (
  state: ISearchState = INITIAL_SEARCHING_STATE,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TypeKeys.SEARCH_ADD:
      return {
        current: action.payload.searchTerm,
        ...state,
      };
    case TypeKeys.SEARCH_REMOVE:
      const { current, previous } = state;

      if (!current) { return state; }
      // remove current term if it was already searched
      const newPrevious = previous.filter(i => i !== current);
      return {
        previous: [
          current,
          ...previous,
        ],
        ...state,
      };
    case TypeKeys.SEARCH_CLEAR:
      return {
        previous: [],
        ...state,
      };
    default:
      return state;
  }
};

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

  /** Work around because object spread operator wasn't working with Enums as Object Keys
   * This: { [gifType]: [...state[gifType], ...gifs], ...state, }
   * Would return: { [GIFS_TRENDING]: [], [GIFS_SEARCH]: [] }
   * Removing `...state` would correctly populate array
   */
  if (gifType === TypeKeys.GIFS_TRENDING) {
    return {
      [gifType]: [...state[gifType], ...gifs],
      [TypeKeys.GIFS_SEARCH]: state[TypeKeys.GIFS_SEARCH],
    };
  } else {
    return {
      [gifType]: [...state[gifType], ...gifs],
      [TypeKeys.GIFS_TRENDING]: state[TypeKeys.GIFS_TRENDING],
    };
  }

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
