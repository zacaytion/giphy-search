/* tslint:disable:interface-name */
import { Action } from 'redux';
import TypeKeys from './typeKeys';

export interface PingAction extends Action {
  type: TypeKeys.PING;
}

export interface PongAction extends Action {
  type: TypeKeys.PONG;
}

export interface OtherAction extends Action {
  type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes =
  | PingAction
  | PongAction
  | OtherAction;
