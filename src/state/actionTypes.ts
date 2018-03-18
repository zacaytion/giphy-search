/* tslint:disable:interface-name */
import { Action } from 'redux';
import { IGIFObject, IPaginationObject } from '../services';
import TypeKeys from './typeKeys';

// TODO: Potentially create action for canceling Searches
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
    pagination: IPaginationObject,
  };
}

export interface GIFSClearAction extends Action {
  type: TypeKeys.GIFS_CLEAR;
  payload: {
    gifType: GIFTypes;
  };
}

export type GIFTypes = TypeKeys.GIFS_SEARCH | TypeKeys.GIFS_TRENDING;

export interface SearchAddAction extends Action {
  type: TypeKeys.SEARCH_ADD;
  payload: {
    searchTerm: string;
  };
}

export interface SearchRemoveAction extends Action {
  type: TypeKeys.SEARCH_REMOVE;
}
export interface SearchClearAction extends Action {
  type: TypeKeys.SEARCH_CLEAR;
}

export interface ErrorSetAction extends Action {
  type: TypeKeys.ERROR_SET;
  payload: {
    err: any;
  };
}

export interface ErrorClearAction extends Action {
  type: TypeKeys.ERROR_CLEAR;
}

export type SearchActions = SearchAddAction | SearchRemoveAction | SearchClearAction;

export interface OtherAction extends Action {
  type: TypeKeys.OTHER_ACTION;
  payload: any;
}

export type GIFActions =
  | GIFSClearAction
  | GIFSearchAction
  | GIFSetAction
  | GIFTrendingAction;

export type ErrorActions = ErrorSetAction | ErrorClearAction;

export type ActionTypes =
  | GIFActions
  | ErrorActions
  | SearchActions
  | OtherAction;
