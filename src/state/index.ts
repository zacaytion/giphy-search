import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import config from '../config';
import { pingEpic, pingReducer } from './epics';
import { initialState } from './init';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

export const history = createHistory();

const epicMiddleware = createEpicMiddleware(pingEpic);

const rootReducer = combineReducers({
  ping: pingReducer,
  router: routerReducer,
});

const middleware = [epicMiddleware, routerMiddleware(history)];

let enhancer;
if (config.isDev) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  } else {
    enhancer = compose(applyMiddleware(...middleware));
  }
export const store = createStore(rootReducer, initialState, enhancer);
