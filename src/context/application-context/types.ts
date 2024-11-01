import {PartyState} from "../../pages/party/party-reducer/types.ts";

export interface ApplicationReducerState {
 parties: PartyState[];
}

export enum ApplicationActionType {
  ADD_PARTY = "ADD_PARTY",

}

export interface ApplicationAction<Type extends ApplicationActionType, Payload> {
  type: Type;
  payload: Payload;
}

export type AppActionFuncWithPayload<Type extends ApplicationActionType, Payload> = (t: Payload) => ApplicationAction<Type, Payload>;
export type AppActionVoidFunction<Type extends ApplicationActionType, Payload> = (() => ApplicationAction<Type, Payload>);