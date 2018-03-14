import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { pingReducer as ping } from './epics';

export interface IAppState {
  routing: any;
  ping: any;
}

export const rootReducer = combineReducers<IAppState>({
  ping,
  routing,
});
