import {AboutPartyState} from "../components/about-party/AboutParty.tsx";
import {Guest} from "../components/guests-list/guest/GuestComponent.tsx";
import {ErrorState} from "../../components/validation";
import {buildDefaultGuest, buildEmptyGuestErrors} from "../components/guests-list/guest/constants.ts";
import {ActionFuncWithPayload, ActionVoidFunction, PartyAction, PartyActionType} from "./types.ts";

type SetAboutPartyStateActionReturnType = PartyAction<PartyActionType.SET_ABOUT_PARTY_STATE, Partial<AboutPartyState>>;

export const setAboutPartyStateAction: ActionFuncWithPayload<SetAboutPartyStateActionReturnType['type'], SetAboutPartyStateActionReturnType['payload']> = (aboutPartyState) => ({
  type: PartyActionType.SET_ABOUT_PARTY_STATE,
  payload: aboutPartyState
})

interface AddNewGuestActionProps {
  guest?: Guest,
  error?: ErrorState<Guest>
}

type AddNewGuestActionReturnType = PartyAction<PartyActionType.ADD_GUEST, AddNewGuestActionProps>;
export const addNewGuestAction: ActionFuncWithPayload<AddNewGuestActionReturnType['type'], AddNewGuestActionReturnType['payload']> = ({
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

export const changeGuest: ActionFuncWithPayload<ChangeGuestActionReturnType['type'], ChangeGuestActionReturnType['payload']> = (payload) => ({
  type: PartyActionType.CHANGE_GUEST,
  payload
})


interface DeleteGuestActionProps {
  id: Guest['id']
}

type DeleteGuestActionReturnType = PartyAction<PartyActionType.DELETE_GUEST, DeleteGuestActionProps>

export const deleteGuestAction: ActionFuncWithPayload<DeleteGuestActionReturnType['type'], DeleteGuestActionReturnType['payload']> = (payload) => ({
  type: PartyActionType.DELETE_GUEST,
  payload
})


type SubmitFormActionReturnType = PartyAction<PartyActionType.SUBMIT_FORM, null>

export const submitFormAction: ActionVoidFunction<SubmitFormActionReturnType['type'], SubmitFormActionReturnType['payload']> = () => ({
  type: PartyActionType.SUBMIT_FORM,
  payload: null
})

type CloseModalActionReturnType = PartyAction<PartyActionType.CLOSE_MODAL, null>

export const closeModalAction: ActionVoidFunction<CloseModalActionReturnType['type'], CloseModalActionReturnType['payload']> = () => ({
  type: PartyActionType.CLOSE_MODAL,
  payload: null
})

export type AvailablePartyAction = SetAboutPartyStateActionReturnType
  | AddNewGuestActionReturnType
  | ChangeGuestActionReturnType
  | DeleteGuestActionReturnType
  | SubmitFormActionReturnType
  | CloseModalActionReturnType