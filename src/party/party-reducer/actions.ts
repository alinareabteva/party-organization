import {AboutPartyState} from "../components/about-party/AboutParty.tsx";
import {Guest} from "../components/guests-list/guest/GuestComponent.tsx";
import {ErrorState} from "../../components/validation";
import {buildDefaultGuest, buildEmptyGuestErrors} from "../components/guests-list/guest/constants.ts";
import {ActionFunc, PartyAction, PartyActionType} from "./types.ts";

type SetAboutPartyStateActionReturnType = PartyAction<PartyActionType.SET_ABOUT_PARTY_STATE, Partial<AboutPartyState>>;

export const setAboutPartyStateAction: ActionFunc<SetAboutPartyStateActionReturnType['type'], SetAboutPartyStateActionReturnType['payload']> = (aboutPartyState) => ({
  type: PartyActionType.SET_ABOUT_PARTY_STATE,
  payload: aboutPartyState
})


interface AddNewGuestActionProps {
  guest?: Guest,
  error?: ErrorState<Guest>
}

type AddNewGuestActionReturnType = PartyAction<PartyActionType.ADD_GUEST, AddNewGuestActionProps>;

export const addNewGuestAction: ActionFunc<AddNewGuestActionReturnType['type'], AddNewGuestActionReturnType['payload']> = ({
                                                                                                                             guest = buildDefaultGuest(),
                                                                                                                             error = buildEmptyGuestErrors()
                                                                                                                           }) => {
  return {
    type: PartyActionType.ADD_GUEST,
    payload: {
      guest,
      error
    }
  }
}

interface ChangeGuestActionProps extends Partial<Guest> {
  id: Guest['id'];
}

type ChangeGuestActionReturnType = PartyAction<PartyActionType.CHANGE_GUEST, ChangeGuestActionProps>;

export const changeGuest: ActionFunc<ChangeGuestActionReturnType['type'], ChangeGuestActionReturnType['payload']> = (payload) => ({
  type: PartyActionType.CHANGE_GUEST,
  payload
})


export type AvailablePartyAction = SetAboutPartyStateActionReturnType
  | AddNewGuestActionReturnType
  | ChangeGuestActionReturnType