import {PartyState} from "../../pages/party/party-reducer/types.ts";

export interface Pageable {
  totalItems: number;///constant - usually comes from backend
  limit: number;
  currentPage: number;//0
  totalPages: number; // totalItems / limit
  offset: number; // (currentPage - 1) * limit
}

export interface ApplicationReducerState {
  parties: PartyState[];
  isPartiesFetched: boolean;
  loading: boolean;
  selectedParties: Array<number>;
  modals: {
    confirmDeleteModalIsOpen: boolean;
  };
  pageable: Pageable;
}

export enum ApplicationActionType {
  SET_PARTIES = "SET_PARTIES",
  ADD_PARTY = "ADD_PARTY",
  DELETE_PARTY = "DELETE_PARTY",
  EDIT_PARTY = "EDIT_PARTY",
  TOGGLE_SELECT_ALL = "TOGGLE_SELECT_ALL",
  TOGGLE_SELECT_ONE = "TOGGLE_SELECT_ONE",
  DELETE_SELECTED = "DELETE_SELECTED",
  TOGGLE_CONFIRM_DELETE_MODAL = "TOGGLE_CONFIRM_DELETE_MODAL",
  SET_PARTIES_LOADING = "SET_PARTIES_LOADING",
  SET_LIMIT = "SET_LIMIT",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
}

export interface ApplicationAction<Type extends ApplicationActionType, Payload> {
  type: Type;
  payload: Payload;
}

export type AppActionFuncWithPayload<Type extends ApplicationActionType, Payload> = (t: Payload) => ApplicationAction<Type, Payload>;
export type AppActionVoidFunction<Type extends ApplicationActionType, Payload> = (() => ApplicationAction<Type, Payload>);