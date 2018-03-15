import { ActionsObservable, Epic } from 'redux-observable';
import { ActionTypes, PingAction, PongAction } from './actionTypes';
import TypeKeys from './typeKeys';

export const pingEpic = (action$: ActionsObservable<ActionTypes>) =>
  action$.ofType<PingAction>(TypeKeys.PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: TypeKeys.PONG });
