import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import config from '../config';
import { ActionTypes } from './actionTypes';
import { pingEpic } from './epics';
import { initialState } from './initial';
import { IAppState, rootReducer } from './reducer';

export const history = createHistory();

const logger = createLogger({
  collapsed: true,
});

// FIXME: TS complains if I don't typecast here
const epicMiddleware =
  createEpicMiddleware(pingEpic as Epic<ActionTypes, IAppState>);

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
  createStore<IAppState>(rootReducer, initialState, middleware);
