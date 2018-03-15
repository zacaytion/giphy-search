import { RouterState } from 'react-router-redux';

export interface IPingState {
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

export const initialState: IAppState = {
  ping: INITIAL_PING_STATE,
  routing: INITIAL_ROUTER_STATE,
};
