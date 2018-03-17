import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { fetchTrendingGIFs, searchForGIFs } from '../services';
import {
  addSearchTerm,
  fetching,
  setGIFs,
  setPagination,
} from './actionCreators';
import {
  ActionTypes,
  GIFSClearAction,
  GIFSearchAction,
  GIFSetAction,
  GIFTrendingAction,
  PaginationSetAction,
} from './actionTypes';
import TypeKeys from './typeKeys';

/** TODO:
 * Handle Cancellation of Request
 */

const searchGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<GIFSearchAction>(TypeKeys.GIFS_SEARCH).mergeMap(action =>
    Observable.fromPromise(searchForGIFs(action.payload)).flatMap(data => {
      const actions = [
        addSearchTerm(action.payload.q),
        setGIFs(data.data, action.type),
        setPagination(action.type),
      ];
      return Observable.from(actions);
    }),
  );

const trendingGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<GIFTrendingAction>(TypeKeys.GIFS_TRENDING).mergeMap(action =>
    Observable.fromPromise(fetchTrendingGIFs(action.payload)).flatMap(data => {
      const actions = [
        setGIFs(data.data, action.type),
        setPagination(action.type),
      ];
      return Observable.from(actions);
    }),
  );

export const rootEpic = combineEpics(searchGIFsEpic, trendingGIFsEpic);
