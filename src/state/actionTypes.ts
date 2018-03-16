/* tslint:disable:interface-name */
import { Action } from 'redux';
import { IGIFObject } from '../services';
import TypeKeys from './typeKeys';

export interface GIFSearchAction extends Action {
  type: TypeKeys.GIFS_SEARCH;
  payload: {
    q: string;
    offset: number;
  };
}

export interface GIFTrendingAction extends Action {
  type: TypeKeys.GIFS_TRENDING;
  payload: {
    offset: number;
  };
}

export interface GIFSetAction extends Action {
  type: TypeKeys.GIFS_SET;
  payload: {
    gifType: GIFTypes;
    gifs: IGIFObject[];
  };
}

export interface GIFSClearAction extends Action {
  type: TypeKeys.GIFS_CLEAR;
  payload: {
    gifType: GIFTypes;
  };
}

export type GIFTypes =
  | TypeKeys.GIFS_SEARCH
  | TypeKeys.GIFS_TRENDING;

export interface FetchingAction extends Action {
  type: TypeKeys.FETCHING;
}

export interface PaginationSetAction extends Action {
  type: TypeKeys.PAGINATION_SET;
  payload: {
    requestType: GIFTypes;
  };
}

export interface PaginationClearAction extends Action {
  type: TypeKeys.PAGINATION_CLEAR;
  payload: {
    requestType: GIFTypes;
  };
}

export interface OtherAction extends Action {
  type: TypeKeys.OTHER_ACTION;
  payload: any;
}

export type GIFActions =
  | GIFSClearAction
  | GIFSearchAction
  | GIFSetAction
  | GIFTrendingAction;

export type PaginationActions =
  | PaginationClearAction
  | PaginationSetAction;

export type ActionTypes =
  | FetchingAction
  | GIFActions
  | PaginationActions
  | OtherAction;
