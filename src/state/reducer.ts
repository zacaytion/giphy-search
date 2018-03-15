import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { ActionTypes } from './actionTypes';
import TypeKeys from './typeKeys';

interface IPingState {
  isPinging: boolean;
}

export interface IAppState {
  routing: RouterState;
  ping: IPingState;
}

export const INITIAL_PING_STATE: IPingState = {
  isPinging: false,
};

export const INITIAL_ROUTER_STATE: RouterState = {
  location: null,
};

export const ping = (state: IPingState = INITIAL_PING_STATE, action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.PING:
      return { isPinging: true };
    case TypeKeys.PONG:
      return { isPinging: false };
    default:
      return state;
  }
};

export const rootReducer = combineReducers<IAppState>({
  ping,
  routing,
});
