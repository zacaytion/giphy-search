import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import config from '../config';
import { pingEpic, pingReducer } from './epics';
import { initialState } from './init';
import { IAppState, rootReducer } from './reducer';

export const history = createHistory();

const logger = createLogger({
  collapsed: true,
});

const epicMiddleware = createEpicMiddleware(pingEpic);

let middleware;

if (config.isDev) {
    middleware = composeWithDevTools(
      applyMiddleware(epicMiddleware, logger, routerMiddleware(history as any)),
    );
  } else {
    middleware = applyMiddleware(
      epicMiddleware, logger, routerMiddleware(history as any),
    );
  }
export const store: Store<IAppState> =
  createStore<IAppState>(rootReducer, initialState as any, middleware);
