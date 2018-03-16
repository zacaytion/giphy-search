import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { fetchTrendingGIFs, searchForGIFs } from '../services';
import {
  ActionTypes,
  GIFSearchAction,
  GIFSetAction,
  GIFTrendingAction,
  PaginationSetAction,
} from './actionTypes';
import TypeKeys from './typeKeys';

const searchGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<GIFSearchAction>(TypeKeys.GIFS_SEARCH)
    .mergeMap(action =>
      // TODO: Set inProgress to True
      Observable.fromPromise(searchForGIFs(action.payload))
        .map(data => ,
          /** TODO:
           * Set Search GIFS
           * Set inProgress to False
           * Set Pagination
           * Handle Cancellation of Request
           */
        ),
    );

const trendingGIFsEpic = (action$: ActionsObservable<ActionTypes>) =>
    action$.ofType<GIFTrendingAction>(TypeKeys.GIFS_TRENDING)
      .mergeMap(action =>
        // TODO: Set inProgress to True
        Observable.fromPromise(fetchTrendingGIFs(action.payload))
          .map(data => ,
            /** TODO:
             * Set Search GIFS
             * Set inProgress to False
             * Set Pagination
             */
          ),
      );

export const rootEpic = combineEpics(searchGIFsEpic, trendingGIFsEpic);
