import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import config from '../config';
import { ActionTypes } from './actionTypes';
import { rootEpic } from './epics';
import { IAppState, initialState } from './initial';
import { rootReducer } from './reducer';

export const history = createHistory();

const logger = createLogger({
  collapsed: true,
});

const epicMiddleware = createEpicMiddleware(rootEpic);

let middleware;

if (config.isDev) {
    middleware = composeWithDevTools(
      applyMiddleware(epicMiddleware, logger, routerMiddleware(history)),
    );
  } else {
    middleware = applyMiddleware(
      epicMiddleware, logger, routerMiddleware(history),
    );
  }

export const store: Store<IAppState> =
  createStore<IAppState>(rootReducer, initialState, middleware);
