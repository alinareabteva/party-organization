import {PartyState} from "../../pages/party/party-reducer/types.ts";

export interface ApplicationReducerState {
 parties: PartyState[];
 selectedParties: Array<number>;
}

export enum ApplicationActionType {
  ADD_PARTY = "ADD_PARTY",
  DELETE_PARTY = "DELETE_PARTY",
  EDIT_PARTY = "EDIT_PARTY",
  TOGGLE_SELECT_ALL = "TOGGLE_SELECT_ALL",

}

export interface ApplicationAction<Type extends ApplicationActionType, Payload> {
  type: Type;
  payload: Payload;
}

export type AppActionFuncWithPayload<Type extends ApplicationActionType, Payload> = (t: Payload) => ApplicationAction<Type, Payload>;
export type AppActionVoidFunction<Type extends ApplicationActionType, Payload> = (() => ApplicationAction<Type, Payload>);