import {AboutPartyState} from "../components/about-party/AboutParty.tsx";
import {Guest} from "../components/guests-list/guest/GuestComponent.tsx";
import {ErrorState} from "../../../components/validation";

export interface PartyState {
  guests: Guest[];
  aboutParty: AboutPartyState;
}

export interface PartyReducerState {
  values: PartyState,
  errors: {
    guests: ErrorState<Guest>[]
    aboutParty: ErrorState<AboutPartyState>
  },
  modal: {
    isOpen: boolean,
  }
}

export enum PartyActionType {
  SET_STATE = "SET_STATE",
  SET_ABOUT_PARTY_STATE = "SET_ABOUT_PARTY_STATE",
  ADD_GUEST = "ADD_GUEST",
  CHANGE_GUEST = "CHANGE_GUEST",
  DELETE_GUEST = "DELETE_GUEST",
  SUBMIT_FORM = "SUBMIT_FORM",
  CLOSE_MODAL = "CLOSE_MODAL",
}


export interface PartyAction<Type extends PartyActionType, Payload> {
  type: Type;
  payload: Payload;
}

export type ActionFuncWithPayload<Type extends PartyActionType, Payload> = (t: Payload) => PartyAction<Type, Payload>;
export type ActionVoidFunction<Type extends PartyActionType, Payload> = (() => PartyAction<Type, Payload>);
