import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { ActionTypes } from './actionTypes';
import { IAppState, INITIAL_PING_STATE, IPingState } from './initial';
import TypeKeys from './typeKeys';

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
