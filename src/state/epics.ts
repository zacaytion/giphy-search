import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { fetchTrendingGIFs, searchForGIFs } from '../services';
import {
  addSearchTerm,
  setError,
  setGIFs,
} from './actionCreators';
import {
  ActionTypes,
  GIFSClearAction,
  GIFSearchAction,
  GIFSetAction,
  GIFTrendingAction,
} from './actionTypes';
import TypeKeys from './typeKeys';

/**
 * This epic watches for the GIF_SEARCH action
 * Turns the promise from the searchGif api call into an Observable
 * Dispatches actions to save search term & gifs to the store
 *
 * @param action$ Observable stream
 */
const searchGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<GIFSearchAction>(TypeKeys.GIFS_SEARCH).mergeMap(action =>
    Observable.fromPromise(searchForGIFs(action.payload)).flatMap(data => {
      const actions = [
        addSearchTerm(action.payload.term),
        setGIFs(data, action.type),
      ];
      return Observable.from(actions);
    }),
  );

/**
 * This epic watches for the GIFS_TRENDING action
 * Turns the promise from the gifTrending api call into an Observable
 * Dispatches actions to save the gifs to the store
 *
 * @param action$ Observable stream
 */
const trendingGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<GIFTrendingAction>(TypeKeys.GIFS_TRENDING).mergeMap(action =>
    Observable.fromPromise(fetchTrendingGIFs(action.payload)).flatMap(data => {
      const actions = [
        setGIFs(data, action.type),
      ];
      return Observable.from(actions);
    }),
  );

export const rootEpic = combineEpics(searchGIFsEpic, trendingGIFsEpic);
