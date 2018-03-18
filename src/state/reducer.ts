import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  ActionTypes,
  GIFSClearAction,
  GIFSetAction,
} from './actionTypes';
import {
  IAppState,
  IErrorState,
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
    case TypeKeys.GIFS_SET:
      const { payload: { gifType } } = action;
      if (gifType === TypeKeys.GIFS_TRENDING) {
          return {
            trending: false,
            ...state,
          };
        } else {
          return {
            searching: false,
            ...state,
          };
        }
    case TypeKeys.GIFS_TRENDING:
      return {
        trending: true,
        ...state,
      };
    case TypeKeys.GIFS_SEARCH:
      return {
      searching: true,
      ...state,
    };
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
    case TypeKeys.GIFS_SET:
      return setPagination(state, action);
    case TypeKeys.GIFS_CLEAR:
      return clearPagination(state, action);
    default:
      return state;
  }
};

function setPagination(state: IPaginationState, action: GIFSetAction) {
  const { gifType } = action.payload;
  return {
    [gifType]: (state[gifType] += 25),
    ...state,
  };
}

function clearPagination(
  state: IPaginationState,
  action: GIFSClearAction,
) {
  const { gifType } = action.payload;
  return {
    [gifType]: 0,
    ...state,
  };
}

const error = (state: IErrorState, action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.ERROR_SET:
      const { payload } = action;
      return {
        errors: [payload.err, ...state.errors],
      };
    case TypeKeys.ERROR_CLEAR:
      return {
        errors: [],
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers<IAppState>({
  error,
  fetching,
  gifs: gifsReducer,
  pagination,
  routing,
  searching,
});
