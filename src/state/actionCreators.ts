import * as types from './actionTypes';
import TypeKeys from './typeKeys';

export type TPing = typeof ping;
export const ping = (): types.PingAction => ({ type: TypeKeys.PING });
