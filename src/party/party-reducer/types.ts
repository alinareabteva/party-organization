import {Guest} from "../components/guests-list/guest/GuestComponent.tsx";
import {AboutPartyState} from "../components/about-party/AboutParty.tsx";
import {ErrorState} from "../../components/validation";

export interface PartyState {
  guests: Guest[];
  aboutParty: AboutPartyState;
}


export interface PartyReducerState {
  values: PartyState,
  errors: {
    guests: ErrorState<Guest>[]
    aboutParty: ErrorState<AboutPartyState>
  }
}

export enum PartyActionType {
  SET_ABOUT_PARTY_STATE = "SET_ABOUT_PARTY_STATE",
  ADD_GUEST = "ADD_GUEST",
  CHANGE_GUEST = "CHANGE_GUEST",
}


export interface PartyAction<Type extends PartyActionType, Payload> {
  type: Type;
  payload: Payload;
}

export type ActionFunc< Type extends PartyActionType, Payload> =  (t: Payload) => PartyAction<Type, Payload>;
